const users = [];

// Estos metodos son necesarios porque el socket cambia siempre

const addUser = (socket_id, name, user_id, room_id) => {
  // Evita entrar al chat dos veces
  const exists = users.find((user) => user.room_id === room_id && user.user_id === user_id);
  if (exists) {
    console.log('[1;31m Quiere agregar el usuario a la lista pero no lo deja por error, esta es la lista usuarios al momento del error');
    console.log(users);

    return { error: 'User already exists in this room' };
  }

  // guarda el usuario en el array
  const user = {
    socket_id, name, user_id, room_id,
  };
  users.push(user);
  console.log('[1;35m -----------------------------');

  console.log('users list:', users);
  console.log('[1;35m -----------------------------');
  return { user };
};

const getUser = (socket_id) => users.find((user) => user.socket_id === socket_id);

const removeUser = (socket_id) => {
  const index = users.findIndex((user) => user.socket_id === socket_id);
  if (index !== -1) {
    console.log('[1;32m Llama al removeUser');

    return users.splice(index, 1)[0];
  }
};

module.exports = {
  addUser, getUser, removeUser, users,
};
