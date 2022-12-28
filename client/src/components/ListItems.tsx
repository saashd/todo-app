import {ListItem, ListItemText, Stack} from "@mui/material";
import React, {useState} from "react";
import {Link} from "react-router-dom";


function ListItems() {
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const handleListItemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    };
    return (
        <Stack direction="row" >
            {[{index: 1, linkTo: "/tasks/daily", title: "My Day"},
                {index: 2, linkTo: "/tasks", title: "My Week"},
            ].map((item, index) => (
                <ListItem
                    style={{width: "max-content"}}
                    key={item.index}
                    selected={selectedIndex === item.index}
                    onClick={(event) => handleListItemClick(event, item.index)}
                    button component={Link} to={item.linkTo}>
                    <ListItemText primary={item.title}/>
                </ListItem>
            ))}
        </Stack>
    );
}

export default ListItems;