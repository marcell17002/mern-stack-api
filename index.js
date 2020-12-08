const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const eventRoutes = require("./src/routes/event");
const authRoutes = require("./src/routes/auth");
const profileRoutes = require("./src/routes/profile");
const chatRoutes = require("./src/routes/chat");
const PORT = process.env.PORT || 4000;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//routes
app.use("/v1/auth", authRoutes);
app.use("/v1/event", eventRoutes);
app.use("/v1/profile", profileRoutes);
app.use("/v1/chat", chatRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://arntonius:Octaviolla27@cluster0.t8xxs.mongodb.net/root?retryWrites=true&w=majority"
  )
  .then(() => {
    app.get("/", (req, res) =>
      res.send("<h2> Hello User! Lets surf with us! :) </h2>")
    );

    const server = app.listen(PORT, () =>
      console.log(`app listening on port ${PORT}`)
    );
    // socket io connection
    const io = socketio(server);
    const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

    io.on("connection", (socket) => {
      console.log(`Client ${socket.id} connected`);

      // Join a conversation
      const { roomId } = socket.handshake.query;
      socket.join(roomId);

      // Listen for new messages
      socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
      });

      // Leave the room if the user closes the socket
      socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);
        socket.leave(roomId);
      });
    });
  })
  .catch((err) => console.log(err));
