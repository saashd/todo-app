import axios from "axios";
import React, {SyntheticEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import {handleError} from "../API";
import Cookies from "universal-cookie";
import {Box, Button, Paper, TextField} from "@mui/material";

const cookies = new Cookies();

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('login', {email, password});
            cookies.set("TOKEN", data.token, {
                path: "/",
            });

            setRedirect(true);

        } catch (error) {
            handleError(error)
        }


    };
    if (redirect) {
        return <Navigate to={'/'}/>;
    }

    return (<main>
        <form onSubmit={submit}>
            <Box
                sx={{
                    paddingLeft:70,
                    paddingRight:70,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gap: 2,
                }}
            >
                <h1>Please sign in</h1>
                {/*<Paper style={{display:"inline-gird"}}*/}
                {/*>*/}
                <TextField type="email" placeholder="name@example.com" required
                           onChange={(e) => {
                               setEmail(e.target.value)
                           }}/>
                <TextField type="password" placeholder="Password" required
                           onChange={(e) => {
                               setPassword(e.target.value)
                           }}/>
                {/*</Paper>*/}
            </Box>
            <Button style={{marginTop:20}} variant="outlined" type="submit">Login</Button>

        </form>
    </main>)
}

export default Login;