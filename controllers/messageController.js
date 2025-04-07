import { Router } from "express";
import Message from '../models/messages.js';
import authenticationMW from '../middlewares/authenticationMiddleware.js';

const router = Router();

router.post('/sendMessage', authenticationMW ,async (req, res) => {
    try{
        const message = new Message(req.body)
        const saveMessage =  await message.save();

        const currentChat =  await Chat.findById(req.body.chatId);
        currentChat.lastMessage = saveMessage.text;
        
        res
        .status(201)
        .send({
            message : 'Message saved successfully!',
            success: true
        });

    } catch(error){
        res
        .status(400)
        .send({
            message : error.message,
            success: false
        });
    }
})

router.get('/getall/:chatId', authenticationMW ,async (req, res) => {
    try{
        const allMessages =
            await Message
            .find({chatId: req.params.chatId}
                .sort({createdAt:1})
            )
        
        res
        .status(200)
        .send({
            message : 'Message fetched successfully!',
            data: allMessages,
            success: true
        });

    } catch(error){
        res
        .status(400)
        .send({
            message : error.message,
            success: false
        });
    }
})
 
export default router