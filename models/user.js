
import mongoose from "mongoose";
import { type } from "os";

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps:true})

export default mongoose.model('users', userSchema);