import axios from "axios";
import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {User} from "../models/user";
import {handleError} from "../API";
import {
    AppBar,
    CssBaseline, Divider, Drawer,
    IconButton,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItems from "./ListItems";


const drawerWidth = 240;

function Nav(props: { user: User }) {

    const [signout, setSignout] = useState(false);

    const logout = async () => {
        try {
            await axios.post('logout', {});
            setSignout(true)
        } catch (error) {
            handleError(error)
        }
    };

    if (signout) {
        return <Navigate to={'/login'}/>;
    }
    return (
        <div>
            <CssBaseline/>
            <AppBar position="fixed" style={{background:"#673ab7"}}>
                <Toolbar>
                    <Typography variant="h6" style={{fontFamily: "cursive"}} color="inherit">
                        Welcome {props.user.name}
                    </Typography>
                    <div style={{flexGrow: 1}}/>

                    <Tooltip title="Profile" aria-label="Profile" arrow>
                        <IconButton color="inherit" component={Link} to="/profile">
                            <AccountCircleIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Sign Out" aria-label="Sign Out" arrow>
                        <IconButton color="inherit" onClick={logout}>
                            <ExitToAppIcon/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent"
                    sx={{
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth,height: 'calc(100% - 64px)', top: 64,},
                    }}>
                <Divider/>
                <ListItems/>
            </Drawer>

        </div>
    );
}


const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    }

};

export default connect(mapStateToProps)(Nav);