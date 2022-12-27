import Wrapper from "../components/Wrapper";
import React, {ChangeEvent, Dispatch, SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../models/user";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/setUserAction";
import {handleError} from "../API";
import {Button, Grid, TextField} from "@mui/material";

function Profile(props: { user: User, setUser: (user: User) => void }) {
    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: ''
    });


    useEffect(() => {
            (async () => {
                setState(state=>({
                    ...state,
                    first_name: props.user.first_name,
                    last_name: props.user.last_name,
                    email: props.user.email
                }))
            })();
        }, [props.user]
    );

    const updateInfo = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const {data} = await axios.put('users/info', {
                first_name: state.first_name,
                last_name: state.last_name,
                email: state.email,
            });
            props.setUser(new User(
                data.id,
                data.first_name,
                data.last_name,
                data.email
            ));

        } catch (e) {
            handleError(e)
        }
    };


    const updatePassword = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            //TODO:change
            await axios.put('users/password', {
                password: state.password,
                password_confirm: state.password_confirm
            })
        } catch (e) {
            handleError(e)
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})

    };


    return (
        <Wrapper>
            <Grid container justifyContent="center"
                      alignItems="center" spacing={3}
            style={{left:0,right:0,position:"fixed"}}>
                <Grid item xs={12}>
                    <h2>Account Information</h2>
                    <form onSubmit={updateInfo}>
                        <div style={{display: "inline-grid",gap:"3%"}}>
                            <TextField name="first_name" placeholder="First Name"
                                       defaultValue={state.first_name} required
                                       onChange={handleChange}/>
                            <TextField name="last_name" placeholder="Last Name"
                                       defaultValue={state.last_name} required
                                       onChange={handleChange}/>

                            <TextField type="text" name="email" placeholder="Email"
                                       defaultValue={state.email} required
                                       onChange={handleChange}/>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <h2>Change Password</h2>
                    <form onSubmit={updatePassword}>
                        <div style={{display: "inline-grid",gap:"3%"}}>
                            <TextField type="password" name="password" placeholder="Password"
                                       defaultValue={state.password} required
                                       onChange={handleChange}/>
                            <TextField type="password" name="password_confirm" placeholder="Password Confirm"
                                       defaultValue={state.password_confirm} required
                                       onChange={handleChange}/>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </Wrapper>
    )
        ;
}


const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    }

};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
