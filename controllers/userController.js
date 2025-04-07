import { Router } from "express";
import User from '../models/user.js';
import authenticationMW from '../middlewares/authenticationMiddleware.js';

const router = Router();

router.get('/getusers', authenticationMW ,async (req, res) => {
    try{
        const user = await User.findOne({_id: req.body.userId})
        res
        .status(200)
        .send({
            message : 'User fetched successfully!',
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