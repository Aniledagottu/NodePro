import mongoose from "mongoose";
import { type } from "os";

const chatSchema =  new mongoose.Schema({
    users: {
        type: [
            {type:mongoose.Schema.Types.ObjectId, ref: "users"}
        ],
    },
    lastMessage: {
        type: [
            {type:mongoose.Schema.Types.ObjectId, ref: "messages"}
        ], 
    },
    unreadMessageCount: {
        type: Number,
        default: 0,
    }
},{timestamps:true})

export default mongoose.model('chats', chatSchema);