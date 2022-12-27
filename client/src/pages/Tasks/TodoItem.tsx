import React from "react"
import {
    Checkbox, Collapse, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText, Paper,

} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void
    deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({todo, updateTodo, deleteTodo}) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Paper>
                <List>
                    <ListItem>
                        <IconButton onClick={handleClick}>
                            {open ? <ExpandLess/> : <ExpandMore/>}
                        </IconButton>
                        <Checkbox
                            edge="start"
                            checked={todo.status}
                            onClick={() => updateTodo({...todo, status: !todo.status})}
                        />
                        <ListItemText primary={todo.name}/>
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => deleteTodo(todo._id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemText primary={todo.description}/>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Paper>
        </div>
    )
};

export default Todo