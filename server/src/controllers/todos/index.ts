import {Response, Request} from "express"
import {ITodo} from "../../types/todo"
import Todo from "../../models/todo"


const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.query.today==="true") {
            let now = new Date();
            let start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, 0, 0);
            let end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 59, 59);
            let query = {createdAt: {$gte: start, $lt: end}};

            const todos: ITodo[] = await Todo.where({uid: req.authInfo,}).find(query);
            res.status(200).json({todos});
        } else {
            const todos: ITodo[] = await Todo.where({uid: req.authInfo}).find();
            res.status(200).json({todos});
        }
    } catch (error) {
        res.status(400).json({message: error});
    }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status">;
        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
            uid: req.authInfo,
        });

        const newTodo: ITodo = await todo.save();

        res.status(201)
            .json({message: "Todo added", todo: newTodo})
    } catch (error) {
        res.status(400).json({message: error});
    }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: {id},
            body,
        } = req;
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            {_id: id},
            body
        );
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo
        })
    } catch (error) {
        res.status(400).json({message: error});
    }
};


const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        );
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo
        })
    } catch (error) {
        res.status(400).json({message: error});
    }
};

export {getTodos, addTodo, updateTodo, deleteTodo}