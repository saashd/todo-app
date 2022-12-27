import React, {Dispatch} from 'react';
import "./App.css"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks/Tasks";
import {User} from "./models/user";
import {setUser} from "./redux/actions/setUserAction";
import {connect} from "react-redux";
import Profile from "./pages/Profile";
import DailyTask from "./pages/Tasks/DailyTask";

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/'} element={<DailyTask/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/tasks'}>
                        <Route index={true} element={<Tasks/>}/>
                    </Route>
                    <Route path={'/profile'} element={<Profile/>}/>
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