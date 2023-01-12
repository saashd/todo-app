import axios from "axios";
import React, {SyntheticEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import {handleError} from "../API";
import Cookies from "universal-cookie";
import {
    Alert,
    AlertColor,
    AppBar,
    Box,
    Button,
    Collapse,
    Grid,
    Paper,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const cookies = new Cookies();

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<AlertColor | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
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
            setStatus('success');
            setOpen(true);


        } catch (err:any) {

            handleError(err);
            setError(err.response.data.message);
            setStatus('error');
            setOpen(true)
        }


    };
    if (redirect) {
        return <Navigate to={'/tasks/daily'}/>;
    }

    return (
        <div style={{
            padding: '20px',
            width: "300px"

        }}>
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <Typography sx={{flex: 1}} variant="h6" component="div">
                        Sign in
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} style={{
                padding: '20px'
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
                {status ?
                    <Box sx={{width: '100%'}}>
                        <Collapse in={open}>
                            <Alert severity={status}
                                   action={
                                       <Button onClick={() => {
                                           setOpen(false);
                                       }}
                                               color="inherit" size="small">
                                           <CloseIcon fontSize="inherit"/>
                                       </Button>
                                   }
                            >{status === "success" ? 'Login succeed!' : error}</Alert>
                        </Collapse>
                    </Box>
                    : <></>}
            </Paper>

        </div>
    )
}

export default Login;