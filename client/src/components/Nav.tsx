import axios from "axios";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {User} from "../models/user";
import handleError from "../api";

function Nav(props: { user: User }) {
    const [signout, setSignout] = useState(false);


    const logout = async () => {
        try {
            await axios.post('logout', {});
            setSignout(true)
        } catch (error) {
            handleError(error)
        }


    };
    if (signout) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3 " href="/#">Company name</a>


            <ul className="my-2 my-md-0 mr-md-3 ">
                <Link to="/profile"
                      className="-2 text-white text-decoration-none ">{props.user.name}</Link>
                <a className="-2 text-white text-decoration-none" href="/#"
                   onClick={logout}>Sign out</a>
            </ul>

        </nav>
    );

}


const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    }

};

export default connect(mapStateToProps)(Nav);