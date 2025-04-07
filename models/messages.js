import mongoose from "mongoose";

const messageSchema =  new mongoose.Schema({
    chatId: {
        type: [
            {type:mongoose.Schema.Types.ObjectId, ref: "chats"}
        ],
    },
    sender: {
        type: [
            {type:mongoose.Schema.Types.ObjectId, ref: "users"}
        ], 
    },
    text: {
        type: String,
        required:true,
    },
    read: {
        type: Boolean,
        required:false,
    },
},{timestamps:true})

export default mongoose.model('messages', messageSchema);