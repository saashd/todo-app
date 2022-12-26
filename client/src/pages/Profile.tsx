import Wrapper from "../components/Wrapper";
import React, {ChangeEvent, Dispatch, SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../models/user";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/setUserAction";
import {handleError} from "../API";

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
                setState({
                    ...state,
                    first_name: props.user.first_name,
                    last_name: props.user.last_name,
                    email: props.user.email
                })
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
            <h2>Account Information</h2>
            <hr/>
            <form onSubmit={updateInfo}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="first_name"
                           defaultValue={state.first_name}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="last_name"
                           defaultValue={state.last_name}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email"
                           defaultValue={state.email}
                           onChange={handleChange}
                    />
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>

            <h2 className="mt-4">Change Password</h2>
            <hr/>
            <form onSubmit={updatePassword}>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password"
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password Confirm</label>
                    <input type="password" className="form-control" name="password_confirm"
                           onChange={handleChange}
                    />
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
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
