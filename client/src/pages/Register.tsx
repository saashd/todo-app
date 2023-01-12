import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import axios from "axios";
import {handleError} from "../API";
import {Button, TextField, Alert, AlertColor, Collapse, Box, Grid} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


function Register(props: { setDialog: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<AlertColor | undefined>(undefined);
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.id]: e.target.value})

    };
    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            first_name: state.firstName,
            last_name: state.lastName,
            email: state.email,
            password: state.password,
            password_confirm: state.passwordConfirm
        };

        if (state.password === state.passwordConfirm) {
            axios.post('register', data).then((res) => {
                setStatus('success');
                setOpen(true);
                setTimeout(() => props.setDialog(false), 1000)
            }).catch((err) => {
                setStatus('error');
                handleError(err);
                setOpen(true)

            })

        } else {
            window.alert('passwords dont match')
        }
    };


    return (<div>
        <form onSubmit={submit}>
            <Grid container justifyContent="center"
                  alignItems="center"
                  direction={"column"} spacing={2}
                  style={{padding: "30px"}}>
                <Grid item>
                    <TextField id="firstName" type="text" placeholder="First Name" required
                               onChange={handleChange}/>
                </Grid>
                <Grid item>
                    <TextField id="lastName" type="text" placeholder="Last Name" required
                               onChange={handleChange}/>
                </Grid>
                <Grid item>
                    <TextField id="email" type="email" placeholder="name@example.com" required
                               onChange={handleChange}/>
                </Grid>
                <Grid item>
                    <TextField id="password" autoComplete="on" type="password" placeholder="Password" required
                               onChange={handleChange}/>
                </Grid>
                <Grid item>
                    <TextField id="passwordConfirm" autoComplete="on" type="password" placeholder="Password Confirm"
                               required
                               onChange={handleChange}/>
                </Grid>
                <Grid item>
                    <Button variant="outlined" type="submit">Submit</Button>
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
                    >{status === "success" ? 'Registration succeed!' : 'Registration failed'}</Alert>
                </Collapse>
            </Box>
            : <></>
        }

    </div>);

}

export default Register;