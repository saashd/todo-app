import React from "react"
import {
    Box, Button, Checkbox, Collapse,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,

} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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
            <Box>
                <Divider/>
                <List>
                    <ListItem>
                        <ListItemButton onClick={handleClick}>
                            {open ? <ExpandLess/> : <ExpandMore/>}
                            <Checkbox
                                edge="start"
                                checked={todo.status}
                                tabIndex={-1}
                                disableRipple
                            />
                            <ListItemText primary={todo.name}/>
                            <ListItemSecondaryAction>
                                <Button
                                    style={{visibility: todo.status ? "hidden" : "visible"}}
                                    onClick={() => updateTodo(todo)}>
                                    Complete
                                </Button>
                                <Button
                                    onClick={() => deleteTodo(todo._id)}>Delete
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemText primary={todo.description}/>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Box>
        </div>
    )
}

export default Todo