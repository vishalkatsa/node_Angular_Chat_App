const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http")
const cors = require("cors");
const router = require("./routers/index");
const io = require('socket.io')(8090, {
    cors: {
        origin: "http://localhost:4200",
    }
});


const app = express();
app.use(express.json());
app.use(cors());
const server = createServer(app);
app.use("/api", router);

let users = [];

io.on('connection', (socket) => {
    console.log("User Connected", socket.id);

    socket.on('addUser', userId => { /// on means recevie
        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit("getUsers", users);
        }
    });
    socket.on('sendMessage', ({ message, senderId, receiverId, conversationId }) => {
        const receiver = users.find(user => user.userId === receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit('getMessage', {
                message,
                senderId,
                conversationId,
                receiverId
            });
        }
    });
    socket.on('typing', ({ senderId, receiverId, conversationId }) => {
        const receiver = users.find(user => user.userId === receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit('typing-commit', {
                senderId,
                conversationId,
                receiverId
            });
        }
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users)
    })
})








app.get('/', (req, res) => {
    res.send('Heellow ')
})

server.listen(9000, () => {
    console.log(`Server Run on 9000`);
})