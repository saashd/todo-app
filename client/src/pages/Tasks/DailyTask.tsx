import {Paper} from "@mui/material";
import React, {useEffect, useState} from "react";
import {deleteTodo, getTodos, updateTodo} from "../../API";
import TodoItem from "./TodoItem";
import Wrapper from "../../components/Wrapper";

const DailyTask = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    useEffect(() => {
        fetchTodos()
    }, []);

    const fetchTodos = (): void => {
        getTodos({today: true})
            .then(({data: {todos}}: ITodo[] | any) => setTodos(todos))
            .catch((err: Error) => console.log(err))
    };

    const handleUpdateTodo = (todo: ITodo): void => {
        updateTodo(todo)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! Todo not updated")
                }
                setTodos(todos.map((t: ITodo) => {
                    return t._id === todo._id ? todo : t
                }))
            })
            .catch(err => console.log(err))
    };

    const handleDeleteTodo = (_id: string): void => {
        deleteTodo(_id)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! Todo not deleted")
                }
                setTodos(todos.filter((t: ITodo) => {
                    return t._id !== _id
                }));
            })
            .catch(err => console.log(err))
    };
    return (
        <Wrapper>
            <h1>My Todos</h1>
            {todos.map((todo: ITodo) => (
                <Paper elevation={3}
                       key={todo._id}
                       className={"paper"}
                >
                    <TodoItem
                        updateTodo={handleUpdateTodo}
                        deleteTodo={handleDeleteTodo}
                        todo={todo}
                    />
                </Paper>
            ))}
        </Wrapper>
    )
}


export default DailyTask;