import Wrapper from "../components/Wrapper";
import React, {ChangeEvent, Dispatch, SyntheticEvent, useEffect, useState} from "react";
import {User} from "../models/user";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/setUserAction";
import {changePassword, handleError, updateUser} from "../API";
import {Button, Grid, Paper, TextField} from "@mui/material";


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
                setState(state => ({
                    ...state,
                    first_name: props.user.first_name,
                    last_name: props.user.last_name,
                    email: props.user.email
                }))
            })();
        }, [props]
    );
    const updateInfo = (e: SyntheticEvent) => {
        e.preventDefault();
        const updatedUser = {
            ...props.user,
            first_name: state.first_name,
            last_name: state.last_name,
            email: state.email,
        };
        updateUser(updatedUser).then(({status, data}) => {
            if (status !== 200) {
                throw new Error("Error! User not updated")
            }
            props.setUser(new User(
                data.user!._id,
                data.user!.first_name,
                data.user!.last_name,
                data.user!.email
            ));
        })
            .catch(e => handleError(e))
    };


    const updatePassword = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (state.password === state.password_confirm) {
            const newData = {id: props.user._id, password: state.password};
            changePassword(newData).then(({status, data}) => {
                if (status !== 200) {
                    throw new Error("Error! User not updated")
                }
            }).catch(e => handleError(e))

        } else {
            window.alert('passwords dont match')
        }

    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})

    };


    return (
        <Wrapper>

            <Grid container justifyContent="center"
                  alignItems="center" spacing={3}
                  style={{left: 0, right: 0, position: "fixed"}}>
                <Paper elevation={3} style={{
                    paddingLeft: '5%',
                    paddingRight:'5%',
                    paddingBottom:'5%',
                    paddingTop:'2%',
                    gap: '10%',
                    display: 'inline-grid',
                    margin: '2%'
                }}>
                    <Grid item xs={12}>
                        <h2>Account Information</h2>
                        <form onSubmit={updateInfo}>
                            <div style={{display: "inline-grid", gap: "3%"}}>
                                <TextField name="first_name" placeholder="First Name"
                                           value={state.first_name} required
                                           onChange={handleChange}/>
                                <TextField name="last_name" placeholder="Last Name"
                                           value={state.last_name} required
                                           onChange={handleChange}/>

                                <TextField type="text" name="email" placeholder="Email"
                                           value={state.email} required
                                           onChange={handleChange}/>
                                <Button type="submit">Save</Button>
                            </div>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Change Password</h2>
                        <form onSubmit={updatePassword}>
                            <div style={{display: "inline-grid", gap: "3%"}}>
                                <TextField autoComplete="on" type="password" name="password" placeholder="Password"
                                           value={state.password} required
                                           onChange={handleChange}/>
                                <TextField autoComplete="on" type="password" name="password_confirm" placeholder="Password Confirm"
                                           value={state.password_confirm} required
                                           onChange={handleChange}/>
                                <Button type="submit">Save</Button>
                            </div>
                        </form>
                    </Grid>
                </Paper>
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
