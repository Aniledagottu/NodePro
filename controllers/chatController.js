import { Router } from "express";
import Chat from '../models/chat.js';
import authenticationMW from '../middlewares/authenticationMiddleware.js';

const router = Router();

router.post('/addchat', authenticationMW ,async (req, res) => {
    try{
        const chat = new Chat(req.body)
        const saveChat =  await chat.save();
        
        res
        .status(201)
        .send({
            message : 'Chat saved successfully!',
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

router.get('/getall', authenticationMW ,async (req, res) => {
    try{
        const allChats = await Chat.find({users:{$in:req.body.userId}})
        
        res
        .status(200)
        .send({
            message : 'Chat fetched successfully!',
            data: allChats,
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