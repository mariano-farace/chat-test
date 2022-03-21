const Room = require('./models/Room');
const Message = require('./models/Message');
const {
  addUser, getUser, removeUser, users,
} = require('./user-utils');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('user connected on socket.id :', socket.id);

    Room.find().then((result) => {
      socket.emit('rooms-in-db', result);
    });

    socket.on('create-room', (name) => {
      const room = new Room({ name });
      // Fijate que si pones socket.emit('room-created', solamente se
      // se actualiza para el usuario que lo crea, el io.emit, lo emite a todos
      room.save().then((result) => {
        io.emit('room-created', result);
      });
    });

    socket.on('join', ({ name, room_id, user_id }) => {
      console.log('[1;34m evento join valor del room', room_id);

      console.log('[1;34m Entra al JOIN');

      const { error, user } = addUser(socket.id, name, user_id, room_id);

      socket.join(room_id);
      io.to(room_id).emit('users-list', users);
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
        io.to(room_id).emit('newMessage', result);// TODO to(room_id) no est aportando nada. Compararlo con el disconnect, ver como lo vas a manejar

        // Llama al setMessage en el front, para que se limpie el espacio de escribir el mensaje
        setMessageCallback();
      });
    });

    socket.on('get-message-history', (room_id) => {
      Message.find({ room_id }).then((result) => {
        socket.emit('message-history', result);
      });
    });

    // TODO borrar, no la vas a usar
    socket.on('get-connected-users', () => {
    });

    socket.on('disconnect', () => {
      // io.emit('users-list', users);
      removeUser(socket.id);
    });
  });
};
