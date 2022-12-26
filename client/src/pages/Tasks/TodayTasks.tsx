import AddTodo from "./AddTodo";
import {Paper} from "@mui/material";
import React, {useEffect, useState} from "react";
import {addTodo, deleteTodo, getTodos, updateTodo} from "../../API";
import TodoItem from "./TodoItem";
import Wrapper from "../../components/Wrapper";

const TodayTasks = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    useEffect(() => {
        fetchTodos()
    }, []);

    const fetchTodos = (): void => {
        getTodos()
            .then(({data: {todos}}: ITodo[] | any) => setTodos(todos))
            .catch((err: Error) => console.log(err))
    };
    const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
        e.preventDefault();
        addTodo(formData)
            .then(({status, data}) => {
                if (status !== 201) {
                    throw new Error("Error! Todo not saved")
                }
                setTodos(data.todos)
            })
            .catch(err => console.log(err))
    };
    const handleUpdateTodo = (todo: ITodo): void => {
        updateTodo(todo)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! Todo not updated")
                }
                setTodos(data.todos)
            })
            .catch(err => console.log(err))
    };

    const handleDeleteTodo = (_id: string): void => {
        deleteTodo(_id)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! Todo not deleted")
                }
                setTodos(data.todos)
            })
            .catch(err => console.log(err))
    };
    return (
        <Wrapper>
            <h1>My Todos</h1>

            {todos.map((todo: ITodo) => (
                <Paper elevation={3}
                       className={"paper"}
                >
                    <TodoItem
                        key={todo._id}
                        updateTodo={handleUpdateTodo}
                        deleteTodo={handleDeleteTodo}
                        todo={todo}
                    />
                </Paper>
            ))}
        </Wrapper>
    )
}


export default TodayTasks;