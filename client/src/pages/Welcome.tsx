import React, {useState} from "react";
import Login from "./Login";
import Register from "./Register";
import {AppBar, Button, Dialog, IconButton, Toolbar, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function Welcome() {
    const [open, setOpen] = useState(false);


    return (<main style={{
            top: 64, left: 0, right: 0, position: 'absolute', width: 'fit-content', margin: 'auto'
        }}>
            <Login/>
            <Button
                style={{}}
                variant='contained' onClick={() => {
                setOpen(!open)
            }}>Register</Button>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={() => {
                    setOpen(!open)
                }}>
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                setOpen(!open)
                            }}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Fill in the blank
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Register/>
            </Dialog>
        </main>
    )
}

export default Welcome;