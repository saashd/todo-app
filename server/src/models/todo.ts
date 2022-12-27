import {ITodo} from "../types/todo"
import {model, Schema} from "mongoose"
import mongoose from 'mongoose';

const todoSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        status: {
            type: Boolean,
            required: true,
        },
        uid: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        day: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "mytodos"
    }
);

export default model<ITodo>("Todo", todoSchema)