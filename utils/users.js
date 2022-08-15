const users = [];

const joinUser = (id, name, room) => {
  const user = { id, userName: name, room };

  users.push(user);
  return user;
};

const getUser = (id) => {
  const user = users.find((user) => user.id === id);
  return user;
};

module.exports = {
  joinUser,
  getUser,
  users,
};
