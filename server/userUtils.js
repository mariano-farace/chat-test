const users = [];

// Estos metodos son necesarios porque el socket cambia siempre

const addUser = (socket_id, name, user_id, room_id) => {
  // Evita entrar al chat dos veces
  const exists = users.find((user) => user.room_id === room_id && user.user_id === user_id);
  if (exists) { return { error: 'User already exists in this room' }; }

  // guarda el usuario en el array
  const user = {
    socket_id, name, user_id, room_id,
  };
  users.push(user);
  console.log('users list:', users);
  return { user };
};

const getUser = (socket_id) => users.find((user) => user.socket_id === socket_id);

const removeUser = (socket_id) => {
  const index = users.findIndex((user) => user.socket_id === socket_id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = { addUser, getUser, removeUser };
