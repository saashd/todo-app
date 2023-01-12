import Wrapper from "../components/Wrapper";
import React, {ChangeEvent, Dispatch, SyntheticEvent, useEffect, useState} from "react";
import {User} from "../models/user";
import {connect, useSelector} from "react-redux";
import {setUser} from "../redux/actions/setUserAction";
import {changePassword, handleError, updateUser} from "../API";
import {
    Alert,
    AlertColor,
    AppBar,
    Box,
    Button,
    Collapse,
    Grid, LinearProgress,
    Paper,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../styles.css"


export interface IRootState {
    user: IUser;
}

function Profile(props: { user: User, setUser: (user: User) => void }) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<AlertColor | undefined>(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: ''
    });
    const user = useSelector((state: IRootState) => state.user);

    useEffect(() => {
            (async () => {
                setState(state => ({
                    ...state,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }));
                setIsLoaded(true);
            })();
        }, [user]
    );
    const updateInfo = (e: SyntheticEvent) => {
        e.preventDefault();
        const updatedUser = {
            ...user,
            first_name: state.first_name,
            last_name: state.last_name,
            email: state.email,
        };
        updateUser(updatedUser).then(({status, data}) => {
            if (status !== 200) {
                setStatus('error');
                setOpen(true);
                throw new Error("Error! User not updated");
            }
            props.setUser(new User(
                user!._id,
                state.first_name,
                state.last_name,
                state.email
            ));
            setStatus('success');
            setOpen(true);

        }).catch(e => handleError(e))
    };


    const updatePassword = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (state.password === state.password_confirm) {
            const newData = {id: props.user._id, password: state.password};
            changePassword(newData).then(({status, data}) => {
                if (status !== 200) {
                    setStatus('error');
                    setOpen(true);
                    throw new Error("Error! Password not updated")
                }
                setStatus('success');
                setOpen(true);
            }).catch(e => handleError(e))

        } else {
            window.alert('passwords dont match')
        }

    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})

    };
    if (!isLoaded) {
        return (<Wrapper>
                <LinearProgress style={{width: '100vw'}}/>
            </Wrapper>
        )
    } else {

        return (
            <Wrapper>
                <div   className="wrap">
                <Grid container justifyContent="center"
                      alignItems="stretch"
                      direction={"row"} spacing={5}
                      >
                    <Grid item>
                        <AppBar sx={{position: 'relative'}}>
                            <Toolbar>
                                <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                    Account Information
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Paper elevation={3} style={{
                            padding: '10px',
                            width: "300px"
                        }}
                        >
                            <form onSubmit={updateInfo}>
                                <Grid container justifyContent="center"
                                      alignItems="center"
                                      direction={"column"} spacing={2}
                                      style={{padding: "10px"}}>
                                    <Grid item>
                                        <TextField name="first_name" placeholder="First Name"
                                                   value={state.first_name} required
                                                   onChange={handleChange}/>
                                    </Grid>
                                    <Grid item>
                                        <TextField name="last_name" placeholder="Last Name"
                                                   value={state.last_name} required
                                                   onChange={handleChange}/>
                                    </Grid>
                                    <Grid item>
                                        <TextField type="text" name="email" placeholder="Email"
                                                   value={state.email} required
                                                   onChange={handleChange}/>
                                    </Grid>
                                    <Grid item>
                                        <Button color="primary" type="submit">Save</Button>
                                    </Grid>

                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <AppBar sx={{position: 'relative'}}>
                            <Toolbar>
                                <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                    Update Password
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Paper elevation={3} style={{
                            padding: '10px',
                            width: "300px"
                        }}
                        >
                            <form onSubmit={updatePassword}>
                                <Grid container justifyContent="center"
                                      alignItems="center"
                                      direction={"column"} spacing={2}
                                      style={{padding: "10px"}}>

                                    <Grid item>
                                        <TextField autoComplete="on" type="password" name="password"
                                                   placeholder="Password"
                                                   value={state.password} required
                                                   onChange={handleChange}/>
                                    </Grid>
                                    <Grid item>
                                        <TextField autoComplete="on" type="password" name="password_confirm"
                                                   placeholder="Password Confirm"
                                                   value={state.password_confirm} required
                                                   onChange={handleChange}/>
                                    </Grid>
                                    <Grid item>
                                        <Button color="primary" type="submit">Save</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>

                        {status ?
                            <Box sx={{width: '25%', left: 0, right: 0, margin: "auto", position: "absolute"}}>
                                <Collapse in={open}>
                                    <Alert severity={status}
                                           action={
                                               <Button onClick={() => {
                                                   setOpen(false);
                                               }}
                                                       color="inherit" size="small">
                                                   <CloseIcon fontSize="inherit"/>
                                               </Button>
                                           }
                                    >{status === "success" ? 'Changes saved successfully!' : 'Failed to save changed'}</Alert>
                                </Collapse>
                            </Box>
                            : <></>
                        }

                    </Grid>
                </Grid>
                     </div>
            </Wrapper>
        );
    }
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
