const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
const eventRoutes = require("./src/routes/event");
const authRoutes = require("./src/routes/auth");
const profileRoutes = require("./src/routes/profile");
const chatRoutes = require("./src/routes/chat");

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
app.get("/", (req, res) =>
  res.send("<h2> Hello User! Welcome to our journey! :) </h2>")
);

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
    app.listen(4000, () => console.log("connection success"));
  })
  .catch((err) => console.log(err));
