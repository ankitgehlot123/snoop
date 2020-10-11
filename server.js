require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 8000;

const users = {};
const socketToRoom = {};

app.use(express.json())
app.use(cors())

const server = app.listen(port, () => console.log('server is running on port :'+port));
const io = require("socket.io").listen(server);

io.on('connection', socket => {
    socket.on("join room", (roomID,name) => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push({name:name,id:socket.id});
        } else {
            users[roomID] = [{name:name,id:socket.id}];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(user => user.id !== socket.id);
        socket.join(roomID);
        socket.emit("all users", usersInThisRoom);
        console.log("user joined:"+name+" the room:"+roomID)
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID , name: payload.name});
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id ,name: payload.name});
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let roomUsers = users[roomID];
        if (roomUsers) {
            roomUsers = roomUsers.filter(user => user.id !== socket.id)
            users[roomID] = roomUsers
            delete socketToRoom[socket.id]
            console.log("user left:"+socket.id+" the room:"+roomID)
        }
        socket.to(roomID).broadcast.emit('user left',socket.id)
        socket.leave(roomID)
        
    });

    socket.on('message', (payload) => {
        const roomID = socketToRoom[socket.id];
        socket.to(roomID).emit('createMessage',payload)
    }); 
    socket.on('error', function (err) {
        console.log(err);
    });
});



