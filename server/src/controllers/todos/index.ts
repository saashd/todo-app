import {Response, Request} from "express"
import {ITodo} from "../../types/todo"
import Todo from "../../models/todo"

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getDateXDaysAgo = (numOfDays: number, date: Date = new Date()) => {
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - numOfDays);
    return daysAgo;
};

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const now = new Date();
        const day = now.getDay();
        const startDate = getDateXDaysAgo(day);
        const endDate = new Date(now.setDate(now.getDate() + (7 - day)));
        let start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
        start.setUTCHours(0, 0, 0, 0);
        let end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        end.setUTCHours(23, 59, 59, 999);
        let query = {createdAt: {$gte: start, $lt: end}};

        if (req.query.today === "true") {
            const today = weekday[day];
            const todos: ITodo[] = await Todo.where({uid: req.authInfo, day: today}).find(query);
            res.status(200).json({todos});
        } else {
            const todos: ITodo[] = await Todo.where({uid: req.authInfo}).find(query);
            res.status(200).json({todos});
        }
    } catch (error) {
        res.status(400).json({message: error});
    }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status" | "day">;
        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
            day: body.day,
            uid: req.authInfo
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