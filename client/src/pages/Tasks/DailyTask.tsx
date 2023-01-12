import {LinearProgress, Paper} from "@mui/material";
import React, {useEffect, useState} from "react";
import {addTodo, deleteTodo, getTodos, handleError, updateTodo} from "../../API";
import TodoItem from "./TodoItem";
import Wrapper from "../../components/Wrapper";
import AddTodo from "./AddTodo";
import "../../styles.css"

const DailyTask = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetchTodos()
    }, []);

    const fetchTodos = (): void => {
        getTodos({today: true})
            .then(({data: {todos}}: ITodo[] | any) => {
                setTodos(todos);
                setIsLoaded(true);
            })
            .catch((err: Error) => handleError(err))
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
            .catch(err => handleError(err))
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
            .catch(err => handleError(err))
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
            .catch(err => handleError(err))
    };
    if (!isLoaded) {
        return (<Wrapper>
                <LinearProgress style={{width: '100vw'}}/>
            </Wrapper>
        )
    } else {
        return (
            <Wrapper>
                <div
                    className="wrap"
                >
                    <Paper elevation={3}
                           style={{
                               margin: "20px",
                               padding: "20px",
                               width: "400px",
                               display: "inline-block"
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
                </div>
            </Wrapper>
        )
    }
}


export default DailyTask;