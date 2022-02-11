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
const authRoutes = require('./routes/authRoutes');
const Room = require('./models/Room');

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

// TODO desacoplar mongo

const mongoDB = 'mongodb://localhost:27017/chat-app';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected')).catch((err) => console.log(err));

console.log('hola, paso por aca!');

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
// TODO, algo esta raro, cualquier cosa que toques en el front te crea un socket nuevo
io.on('connection', (socket) => {
  console.log('user connected on socket.id :', socket.id);

  socket.on('create-room', (name) => {
    const room = new Room({ name });
    room.save().then((result) => { io.emit('room-created', result); });
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
