import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({path:'./config.env'});
mongoose.connect(process.env.DB_STRING);

const db = mongoose.connection;

db.on ('connected', () => {
    console.log("DB connected successfully!")
});

db.on ('error', () => {
    console.log('DB connection failed!')
});

export default db;