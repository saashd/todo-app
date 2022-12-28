import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import axios from "axios";
import {handleError} from "../API";
import {Button, DialogActions, TextField} from "@mui/material";

function Register(props: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
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
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            first_name: state.firstName,
            last_name: state.lastName,
            email: state.email,
            password: state.password,
            password_confirm: state.passwordConfirm
        };
        try {
            if (state.password === state.passwordConfirm) {
                await axios.post('register', data);
                props.setOpen(false)
            } else {
                window.alert('passwords dont match')
            }
        } catch (e) {
            handleError(e)

        }
    };
    return (<div style={{left: 0, right: 0, margin: "auto"}}>
        <form onSubmit={submit}>
            <div>
                <TextField id="firstName" type="text" placeholder="First Name" required
                           onChange={handleChange}/>
            </div>
            <div>
                <TextField id="lastName" type="text" placeholder="Last Name" required
                           onChange={handleChange}/>
            </div>
            <div>
                <TextField id="email" type="email" placeholder="name@example.com" required
                           onChange={handleChange}/>
            </div>
            <div>
                <TextField id="password" autoComplete="on" type="password" placeholder="Password" required
                           onChange={handleChange}/>
            </div>
            <div><TextField id="passwordConfirm" autoComplete="on" type="password" placeholder="Password Confirm"
                            required
                            onChange={handleChange}/>
            </div>
            <DialogActions>
                <Button variant="outlined" type="submit">Submit</Button>
            </DialogActions>

        </form>
    </div>);

}

export default Register;