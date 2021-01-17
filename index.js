const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(cors());
app.use(router);




io.on('connect', (socket) => {


  socket.on('join', ({ name, room }, callback) => {

const date= new Date();
const hour=date.getHours()+4;
const min= date.getMinutes();

    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: '', text: `${user.name}, բարի գալուստ ${user.room} սենյակ!!! `, hour: hour, min: min  });
    
    
    socket.broadcast.to(user.room).emit('message', { user: '', text: `${user.name}-ը միացավ!`, hour: hour, min: min  });
  
    

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  

  socket.on('sendMessage', (message, callback) => {
     const user = getUser(socket.id);


    const date= new Date();
    const hour=date.getHours()+4;
    const min= date.getMinutes();

    io.to(user.room).emit('message', { user: user.name, text: message, hour: hour, min: min });

    callback();
  });

  socket.on('disconnect', () => {

     const date= new Date();
    const hour=date.getHours()+4;
    const min= date.getMinutes();

    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: '', text: `${user.name}-ը դուրս եկավ!`, hour: hour, min: min });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));