import React, {ChangeEvent, useState} from 'react'
import {Button, Dialog, TextField} from "@mui/material";

type Props = {
    saveTodo: (e: React.FormEvent, formData: ITodo | any) => void
    day: string
}

const AddTodo: React.FC<Props> = ({saveTodo, day}) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<ITodo | {}>({day});

    const handleForm = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    };

    return (
        <div>
            <Button color="primary" variant="contained"
                    style={{margin: "10px"}}
                    onClick={() => {
                        setOpen(!open)
                    }}>
                Add Task
            </Button>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={() => {
                    setOpen(!open)
                }}>
                <form className='Form' onSubmit={(e) => {
                    saveTodo(e, formData);
                    setOpen(!open);
                }}
                      style={{padding: "30px", textAlign: "center"}}>
                    <div style={{display: "grid", rowGap: "15px"}}>
                        <TextField label='Name' type='text' id='name' onChange={handleForm} required/>
                        <TextField label='Description' type='text' id='description' onChange={handleForm} required/>
                    </div>
                    <Button color="primary" style={{margin: "10px"}} variant="outlined" type="submit">Save</Button>
                </form>
            </Dialog>
        </div>

    )
}

export default AddTodo