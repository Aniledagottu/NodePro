import { Router } from "express";
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/signup', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if(user){
            res.
            status(400).
            send({
                message : 'Email already exist',
                success: false
            });
            return;
        };
        const newUser = new User(req.body);
        newUser.save();
        res.
        status(201).
        send({
            message : 'User created successfully!',
            success: true
        });

    } catch(error){
        res
        .status(500)
        .send({
            message : error.message,
            success: false
        });
    }
})

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user){
            res
            .status(400)
            .send({
                message : 'invalid credential',
                success: false
            });
            return;
        };
        if(user.password != req.body.password){
            res
            .status(400)
            .send({
                message : `invalid credential ${user.password}`,
                success: false
            });
            return;
        }
        const token = jwt.sign({ userInfo: user._id }, process.env.SECRET_KEY,{ expiresIn:"1d" }) 
        res
        .status(200)
        .send({
            message : 'User loggedin successfully!',
            success: true,
            user:{
                name: user.name,
                email: user.email
            },
            token: token
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