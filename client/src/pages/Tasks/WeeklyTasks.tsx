import AddTodo from "./AddTodo";
import {Grid, Paper, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {addTodo, deleteTodo, getTodos, handleError, updateTodo} from "../../API";
import TodoItem from "./TodoItem";
import Wrapper from "../../components/Wrapper";


const sortTasksbyDay = (todos: ITodo[]) => {
    const tasksByDay: { [day: string]: ITodo[]; } = {
        Sunday: [], Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: []
    };
    todos.forEach((t: ITodo) => {
        tasksByDay[t.day!] = [...tasksByDay[t.day!], t];
    });
    return tasksByDay


};
const WeeklyTasks = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [tasksByDay, setTasksByDay] = useState({});
    useEffect(() => {
        fetchTodos()
    }, []);

    const fetchTodos = (): void => {
        getTodos()
            .then(({data: {todos}}: ITodo[] | any) => {
                setTodos(todos);
                setTasksByDay(sortTasksbyDay(todos))
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
                setTasksByDay(sortTasksbyDay([...todos, data.todo!]))
            })
            .catch(err => handleError(err))
    };
    const handleUpdateTodo = (todo: ITodo): void => {
        updateTodo(todo)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! Todo not updated")
                }
                const newTodos = todos.map((t: ITodo) => {
                    return t._id === todo._id ? todo : t
                });
                setTodos(newTodos);
                setTasksByDay(sortTasksbyDay(newTodos));
            })
            .catch(err => handleError(err))
    };

    const handleDeleteTodo = (_id: string): void => {
        deleteTodo(_id)
            .then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! Todo not deleted")
                }
                const newTodos = todos.filter((t: ITodo) => {
                    return t._id !== _id
                });
                setTodos(newTodos);
                setTasksByDay(sortTasksbyDay(newTodos));
            })
            .catch(err => handleError(err))
    };
    return (
        <Wrapper>
            <div>
                <Grid container justifyContent="center"
                      alignItems="stretch" spacing={3} direction="row">
                    {
                        Object.entries(tasksByDay)
                            .map(([key, value]: [string, any]) =>
                                <Grid key={key} item sm={6} style={{display: "flex"}}>
                                    <Paper elevation={1} style={{
                                        width: '400px',
                                        display: 'inline-block',
                                        position: 'relative'
                                    }}>
                                        <div>
                                            <Typography variant="h5" style={{fontFamily: "cursive",margin:"5%"}}>{key}</Typography>
                                            {value.map((todo: ITodo) => (
                                                <TodoItem
                                                    key={todo._id}
                                                    updateTodo={handleUpdateTodo}
                                                    deleteTodo={handleDeleteTodo}
                                                    todo={todo}
                                                />
                                            ))}
                                        </div>
                                        <div style={{
                                            bottom: -20, left: 0, right: 0, position: "absolute"
                                        }}>
                                            <AddTodo saveTodo={handleSaveTodo} day={key}/>
                                        </div>
                                    </Paper>
                                </Grid>
                            )
                    }
                </Grid>
            </div>
        </Wrapper>
    )
}


export default WeeklyTasks;