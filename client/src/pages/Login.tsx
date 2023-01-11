import axios from "axios";
import React, {SyntheticEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import {handleError} from "../API";
import Cookies from "universal-cookie";
import {AppBar, Button, Grid, Paper, TextField, Toolbar, Typography} from "@mui/material";


const cookies = new Cookies();

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('login', {email, password}, {
                headers: {
                    "Access-Control-Allow-Origin": true
                }
            });
            cookies.set("TOKEN", data.token, {
                path: "/",
            });

            setRedirect(true);

        } catch (error) {
            handleError(error)
        }


    };
    if (redirect) {
        return <Navigate to={'/tasks/daily'}/>;
    }

    return (
        <div style={{
            padding: '10%',
            display: 'inline-grid',
            width: "300px"

        }}>
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Sign in
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} style={{
                padding: '5%'
            }}>
                <form onSubmit={submit}>
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                            <TextField type="email" placeholder="name@example.com" required
                                       onChange={(e) => {
                                           setEmail(e.target.value)
                                       }}/>
                        </Grid>
                        <Grid item>
                            <TextField type="password" placeholder="Password" required
                                       onChange={(e) => {
                                           setPassword(e.target.value)
                                       }}/>
                        </Grid>
                        <Grid item>
                            <Button style={{marginTop: 20}} variant="outlined" type="submit">Login</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}

export default Login;