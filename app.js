import express from 'express';
import bodyParser from 'body-parser';
import commonController  from './controllers/commonController.js  ';
import authController  from './controllers/authController.js';
import userController  from './controllers/userController.js';
import chatController  from './controllers/chatController.js';
import messageController  from './controllers/messageController.js';
import http from 'http';
import cors from 'cors';
import { createSocket } from './src/socket.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*'
}));

app.use('/', commonController);
app.use('/auth', authController);
app.use('/user', userController);
app.use('/chat', chatController);
app.use('/message', messageController);


const server = http.createServer(app)
const io = createSocket(server)

export default server;