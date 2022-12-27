import React, {Dispatch} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import WeeklyTasks from "./pages/Tasks/WeeklyTasks";
import {User} from "./models/user";
import {setUser} from "./redux/actions/setUserAction";
import {connect} from "react-redux";
import Profile from "./pages/Profile";
import DailyTask from "./pages/Tasks/DailyTask";

function App() {
    return (
        <div style={{
            textAlign: 'center',
            width: '100vw',
            height: '100vh'
        }}>
            <Router>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/'} element={<DailyTask/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/tasks'}>
                        <Route index={true} element={<WeeklyTasks/>}/>
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