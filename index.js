const app = require("express")();
const server = require("http").createServer(app);
const socketio = require("socket.io");
const { joinUser, users } = require("./utils/users.js");
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// run when a client connects

const botName = "Chatly Bot";
io.on("connection", (socket) => {
  // when a user joins the chat

  // -----------Room-------------------

  // join a room with username and room name
  socket.on("joinRoom", ({ username, room }) => {
    const user = joinUser(socket.id, username, room);

    socket.emit("message", {
      user: botName,
      text: `${user.userName} Welcome To ${user.room} Room`,
    });
    // join in the room
    socket.join(user.room);
    //  send a message
    socket.on("chatMessage", (message) => {
      console.log(message, "message");
      socket.broadcast.to(user.room).emit("message", message);
    });

    socket.broadcast.to(user.room).emit("message", {
      usernmame: botName,
      text: `${user.userName} has joined the chat room name! ${user.room}`,
    });

    // when user disocnnects
    socket.on("disconnect", () => {
      socket.broadcast.to(user.room).emit("message", {
        username: botName,
        text: `${user.userName} Disconnected`,
      });
    });
  });

  // -------------End OF Room-----------------
});
server.listen(4000, () => console.log("Server Is Listening To Port 4000"));
