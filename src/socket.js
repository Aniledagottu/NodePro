import { Server  } from 'socket.io';

const  users = {};

export const createSocket = (server) => {
    const io =  new Server(server, {
        cors:{
            origin: '*',
            methods: '*'
        }
    });

    io.on("connection", (socket) => {
        console.log("user connected",socket.id);

        socket.on('register', (username) => {
            users[username] = socket.id;
            console.log(`${username} connected with socket ID: ${socket.id}`);
        });
        
        // Chat between user and admin
        socket.on('chat_message', (data) => {
        const { target, message, sender } = data;
        if (users[target]) {
            io.to(users[target]).emit('chat_message', { message, sender });
        } else {
            console.log('Target user not found');
        }
        });
        
        socket.on('admin_chat_message', (data) => {
        const { target, message, sender } = data;
        if (users[target]) {
            io.to(users[target]).emit('admin_chat_message', { message, sender });
        } else {
            console.log('Target user not found');
        }
        });
    
        socket.on('disconnect', () => {
        console.log('User disconnected');
        });
    });

    return io;
} 

