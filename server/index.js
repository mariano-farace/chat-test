const express = require('express');
const { Server } = require('socket.io');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
// TODO por que esta en las cookies? podría modificar esto mas adelante para que vaya en un header

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

const httpServer = require('http').createServer(app);
const mongoose = require('mongoose');
const { join } = require('path');
const authRoutes = require('./routes/authRoutes');
const Room = require('./models/Room');

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

// TODO desacoplar mongo

const mongoDB = 'mongodb://localhost:27017/chat-app';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected')).catch((err) => console.log(err));
const { addUser, getUser, removeUser } = require('./userUtils');
const Message = require('./models/Message');

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
// TODO, algo esta raro, cualquier cosa que toques en el front te crea un socket nuevo
io.on('connection', (socket) => {
  console.log('user connected on socket.id :', socket.id);

  Room.find().then((result) => {
    socket.emit('rooms-in-db', result);
  });

  socket.on('create-room', (name) => {
    const room = new Room({ name });
    // Fijate que si pones socket.emit('room-created', solamente se
    // se actualiza para el usuario que lo crea, el io.emit, lo emite a todos
    room.save().then((result) => { io.emit('room-created', result); });
  });

  socket.on('join', ({ name, room_id, user_id }) => {
    const { error, user } = addUser(socket.id, name, user_id, room_id);

    socket.join(room_id);
    if (error) {
      console.log('join error', error);
    } else {
      console.log('joined user: ', user);
    }
  });

  socket.on('sendMessage', (message, room_id, setMessageCallback) => {
    const user = getUser(socket.id);

    const messageToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message,
    };

    console.log('el backend recibio este mensaje: ', message);

    const msg = new Message(messageToStore);
    msg.save().then((result) => {
      io.to(room_id).emit('newMessage', result);
      // Llama al setMessage en el front, para que se limpie es espacio de escribir el mensaje
      setMessageCallback();
    });
  });

  socket.on('get-message-history', (room_id) => {
    Message.find({ room_id }).then((result) => {
      socket.emit('message-history', result);
    });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
