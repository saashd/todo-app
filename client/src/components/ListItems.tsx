import {makeStyles} from "@mui/styles";
import {List, ListItem, ListItemText} from "@mui/material";
import React, {useState} from "react";
import {Link} from "react-router-dom";

const useStyles = makeStyles(() => ({
        root: {
            '&.Mui-selected': {
                background: 'rgba(63,81,181,0.11)',
                color: '#3f51b5',
                '& path': {
                    fill: '#3f51b5',
                }
            },
            "&:hover": {
                background: 'rgba(63,81,181,0.11)'
            },
            '&.active, &:hover, &.active:hover': {
                '& path': {
                    fill: '#3f51b5',
                }
            }
        },

    }
));

function ListItems() {
    let classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const handleListItemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };
    return (
        <div style={{paddingLeft: 5}}>
            <List>
                {[{index: 1, linkTo: "/", title: "My Day"},
                    {index: 2, linkTo: "/tasks", title: "My Week"},
                ].map((item, index) => (
                    <ListItem key={item.index}
                              selected={selectedIndex === item.index}
                              onClick={(event) => handleListItemClick(event, item.index)}
                              className={classes.root} button component={Link} to={item.linkTo}>
                        <ListItemText primary={item.title}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default ListItems;