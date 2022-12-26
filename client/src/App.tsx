import React, {Dispatch} from 'react';
import "./App.css"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks/Tasks";
import {User} from "./models/user";
import {setUser} from "./redux/actions/setUserAction";
import {connect} from "react-redux";

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/tasks'}>
                        <Route index={true} element={<Tasks/>}/>
                    </Route>
                </Routes>
            </Router>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);