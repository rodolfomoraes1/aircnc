const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.Server(app);
const io = socketIo(server);

// For study purposes I will save the logged users
// here, but the best approach would be to use
// Redis to store this info.
const connectUsers = {};

mongoose.connect(
  "mongodb+srv://user:user@cluster0-0m5fr.mongodb.net/aircandc?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;
  connectUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectUsers = connectUsers;

  return next();
});
app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(3333);
