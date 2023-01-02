import React, {Dispatch} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import WeeklyTasks from "./pages/Tasks/WeeklyTasks";
import {User} from "./models/user";
import {setUser} from "./redux/actions/setUserAction";
import {connect} from "react-redux";
import Profile from "./pages/Profile";
import DailyTask from "./pages/Tasks/DailyTask";
import Background from "./components/Background/Background";
import Welcome from "./pages/Welcome";
import createTheme from "@mui/material/styles/createTheme";
import {ThemeProvider} from "@mui/material/styles";



const theme = createTheme({
    palette: {
        primary: {
            main: '#AD343E',
        },
        secondary: {
            main: '#FFB400',
        },

    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div style={{
                textAlign: 'center'
            }}>
                <Background/>
                <Router>
                    <Routes>
                        <Route path={'/'} element={<DailyTask/>}/>
                        <Route path={'/welcome'} element={<Welcome/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/tasks'}>
                            <Route index={true} element={<WeeklyTasks/>}/>
                            <Route path={'/tasks/daily'} element={<DailyTask/>}/>
                        </Route>
                        <Route path={'/profile'} element={<Profile/>}/>
                    </Routes>
                </Router>

            </div>
        </ThemeProvider>
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