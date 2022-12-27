import {Paper} from "@mui/material";
import React, {useEffect, useState} from "react";
import {addTodo, deleteTodo, getTodos, updateTodo} from "../../API";
import TodoItem from "./TodoItem";
import Wrapper from "../../components/Wrapper";
import AddTodo from "./AddTodo";

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
    const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
        e.preventDefault();
        addTodo(formData)
            .then(({status, data}) => {
                if (status !== 201) {
                    throw new Error("Error! Todo not saved")
                }
                setTodos([...todos, data.todo!]);
            })
            .catch(err => console.log(err))
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
            <Paper elevation={3} style={{
                width: '400px',
                left: 0, right: 0, position: "fixed", margin: "auto",
                padding: "1%"
            }}>
                {todos.map((todo: ITodo) => (
                    <TodoItem
                        key={todo._id}
                        updateTodo={handleUpdateTodo}
                        deleteTodo={handleDeleteTodo}
                        todo={todo}
                    />
                ))}
                <AddTodo saveTodo={handleSaveTodo} day={''}/>
            </Paper>
        </Wrapper>
    )
}


export default DailyTask;