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

io.on("connection", socket => {
  console.log("Connected user", socket.id);
});

mongoose.connect(
  "mongodb+srv://user:user@cluster0-0m5fr.mongodb.net/aircandc?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(3333);
