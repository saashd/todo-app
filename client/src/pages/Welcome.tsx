import React, {useState} from "react";
import Login from "./Login";
import Register from "./Register";
import {Button, Dialog, DialogTitle} from "@mui/material";

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
                <DialogTitle>
                    Fill in the blank
                </DialogTitle>
                <Register setOpen={setOpen}/>
            </Dialog>
        </main>
    )
}

export default Welcome;