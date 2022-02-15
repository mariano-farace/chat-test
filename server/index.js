const express = require('express');
const { Server } = require('socket.io');
const { join } = require('path');
const jwt = require('jsonwebtoken');

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
const { createJWT } = require('./controllers/authControllers');
const User = require('./models/User');
const {
  JWT_SECRET,
  COOKIE_NAME,
  CLIENT_ROOT_URI,
} = require('./config');
const { getGoogleAuthURL, getGoogleUser } = require('./controllers/google-auth');
const authRoutes = require('./routes/authRoutes');
const Room = require('./models/Room');

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

//! Google Auth

// Getting google auth login URL
const googleAuthURL = getGoogleAuthURL();

app.get('/auth/google/url', (req, res) => res.redirect(googleAuthURL));

app.get('/login/google-auth', async (req, res) => {
  const { code } = req.query;
  console.log('el puto codigo: ', code);
  const googleUser = await getGoogleUser({ code });
  console.log('result de getGoogleUser:::', googleUser);
  // //!mY NEW CODE PONER EN TRY CATCH BLOCK
  try {
    let user = await User.findOne({ email: googleUser.email });
    if (!user) {
      console.log('el user no existe, crea uno');
      user = await User.create({ name: googleUser.name, email: googleUser.email, password: 'isOauth: true' });
    }
    const maxAge = (24 * 60 * 60);

    const token = jwt.sign({ user }, 'chatroom secret', {
      expiresIn: maxAge,
    });
    res.cookie(COOKIE_NAME, token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect(CLIENT_ROOT_URI);
    // res.status(201).json({ user });

    console.log('el user existe');
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
  // //!mY NEW CODE
  //   const token = jwt.sign(googleUser, JWT_SECRET);
  //   res.cookie(COOKIE_NAME, token, {
  //     maxAge: 900000,
  //     httpOnly: true,
  //     secure: false,
  //   });
  //   console.log('el token que deberia haber: ', token);
  //   res.redirect(CLIENT_ROOT_URI);

  // //! esto es lo que hace el login original
  // const { email, password } = req.body;
  // try {
  //   const user = await User.login(email, password);
  //   // eslint-disable-next-line no-underscore-dangle
  //   const token = createJWT(user._id);
  //   res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  //   res.status(201).json({ user });
  // } catch (error) {
  //   const errors = alertError(error);
  //   res.status(400).json({ errors });
  // }
  // //!
});

app.get('/google-login-redirect', (req, res) => {
  console.log('google-login-redirect Route!');
  try {
    const decodedToken = jwt.verify(req.cookies[COOKIE_NAME], 'chatroom secret');
    const { user } = decodedToken;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
});

//! MONGO
const mongoDB = 'mongodb://localhost:27017/chat-app';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected')).catch((err) => console.log(err));
const { addUser, getUser, removeUser } = require('./userUtils');
const Message = require('./models/Message');

//! SOCKET.IO

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
