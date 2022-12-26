import React, {ChangeEvent, useState} from 'react'
import {Button, TextField} from "@mui/material";

type Props = {
    saveTodo: (e: React.FormEvent, formData: ITodo | any) => void
}

const AddTodo: React.FC<Props> = ({saveTodo}) => {
    const [formData, setFormData] = useState<ITodo | {}>();

    const handleForm = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    return (
        <form className='Form' onSubmit={(e) => saveTodo(e, formData)}
        style={{display:"inline-grid",margin:"2%"}}>
            <div style={{display:"grid",rowGap:"10px"}}>
                <TextField label='Name' type='text' id='name' onChange={handleForm}/>
                <TextField label='Description' type='text' id='description' onChange={handleForm}/>
            </div>
            <Button disabled={formData === undefined}>Add Todo</Button>
        </form>
    )
}

export default AddTodo