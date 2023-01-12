import React, {useState} from "react";
import Login from "./Login";
import Register from "./Register";
import {AppBar, Button, Dialog, IconButton, Toolbar, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "../styles.css"

function Welcome() {
    const [open, setOpen] = useState(false);


    return (<main className="wrap">
            <div style={{
                top: 64,
                width: 'fit-content',
                margin: 'auto',
                left: 0,
                right: 0,
                padding: '40px'

            }}>
                <Login/>
                <Button
                    style={{}}
                    variant='contained' onClick={() => {
                    setOpen(true)
                }}>Register</Button>
                <Dialog
                    fullWidth={true}
                    open={open}
                    onClose={() => {
                        setOpen(false)
                    }}>
                    <AppBar sx={{position: 'relative'}}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => {
                                    setOpen(false)
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
                    <Register setDialog={setOpen}/>
                </Dialog>
            </div>
        </main>
    )
}

export default Welcome;