import Nav from "./Nav";
import React, {Dispatch, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/setUserAction";
import Cookies from "universal-cookie";
import axios from "axios";
import {User} from "../models/user";
import {handleError} from "../API";

const cookies = new Cookies();

function Wrapper(props: any) {
    const token = cookies.get("TOKEN");
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                if (token) {
                    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
                    const {data} = await axios.get('user');
                    props.setUser(
                        new User(data.user._id, data.user.first_name, data.user.last_name, data.user.email));
                } else {
                    setRedirect(true);
                }
            } catch (error) {
                setRedirect(true);
                handleError(error);

            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    if (redirect) {
        return <Navigate to={'/welcome'}/>;
    }
    return (<div>
        <Nav/>
        <main style={{
            top: "64px",
            position: 'absolute'
        }}>
            {props.children}


        </main>
    </div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);