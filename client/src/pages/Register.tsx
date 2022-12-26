import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {handleError} from "../API";

function Register() {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [redirect, setRedirect] = useState(false);
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
            await axios.post('register', data);
            setRedirect(true);

        } catch (e) {
            handleError(e)

        }
    };
    if (redirect) {
        return <Navigate to={'/login'}/>;
    }
    return (<div>
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                <input id="firstName" type="text" className="form-control" placeholder="First Name" required
                       onChange={handleChange}/>
                <input id="lastName" type="text" className="form-control" placeholder="Last Name" required
                       onChange={handleChange}/>
                <input id="email" type="email" className="form-control" placeholder="name@example.com" required
                       onChange={handleChange}/>
                <input id="password" type="password" className="form-control" placeholder="Password" required
                       onChange={handleChange}/>
                <input id="passwordConfirm" type="password" className="form-control" placeholder="Password Confirtm"
                       required
                       onChange={handleChange}/>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

            </form>
        </main>
    </div>);

}

export default Register;