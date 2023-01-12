import React from "react"
import {
    Checkbox, Collapse, IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText, Paper
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void
    deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({updateTodo, deleteTodo, todo}) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Paper style={{margin: "20px"}}>
            <List>
                <ListItem>
                    <IconButton onClick={handleClick}>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                    <Checkbox
                        color="secondary"
                        checked={todo.status}
                        onClick={() => updateTodo({...todo, status: !todo.status})}
                    />
                    <ListItemText primary={todo.name}
                                  primaryTypographyProps={{
                                      variant: 'subtitle1',
                                      style: {
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          textDecorationLine: todo.status ? "line-through" : "none"
                                      }
                                  }}/>
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => deleteTodo(todo._id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <div style={{
                        inlineSize: " 150px",
                        overflowWrap: "break-word",
                        margin: "auto"
                    }}>
                        {todo.description}
                    </div>
                </Collapse>
            </List>
        </Paper>
    )
};

export default Todo