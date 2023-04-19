const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");

// Socket IO dependencies
const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const checkJwt = auth({
  audience: process.env.DB_AUDIENCE,
  issuerBaseURL: process.env.DB_ISSUER_BASEURL,
});

const db = require("./db/models/index");
const { users, questionnaires, chatrooms, messages } = db;

const UserController = require("./Controllers/UserController");
const QuestionnaireController = require("./Controllers/QuestionnaireController");
const MessageController = require("./Controllers/MessageController");

const UserRouter = require("./Routers/UserRouter");
const QuestionnaireRouter = require("./Routers/QuestionnaireRouter");
const MessageRouter = require("./Routers/MessageRouter");

const userController = new UserController(users);
const questionnaireController = new QuestionnaireController(questionnaires);
const messageController = new MessageController(messages, chatrooms, users);

const userRouter = new UserRouter(userController, express).route();
const questionnaireRouter = new QuestionnaireRouter(
  questionnaireController,
  express
).route();

const messageRouter = new MessageRouter(messageController, express).route();

app.use("/students", userRouter);
app.use("/questionnaire", questionnaireRouter);
app.use("/messages", messageRouter);

// Socket IO implementation
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log(socket.id);

  socket.on("join_room", async (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
    // Get all messages on join
    const allMessages = await messages.findAll(
      { include: users }, // Joins the user table
      { where: { chatroom_id: data } } // Specifies the specific chatroom ID
    );

    // console.log(allMessages);

    const formattedMessages = await allMessages.map((message) => ({
      ...message.toJSON(),
      time: `${new Date(message.createdAt).getHours()}:${new Date(
        message.createdAt
      )
        .getMinutes()
        .toString()
        .padStart(2, "0")}`,
      author: message.user.first_name,
      chatroomIndex: message.chatroom_id,
    }));
    // console.log(formattedMessages);
    // console.log("data", data);
    socket.emit("load_messages", formattedMessages);
  });

  socket.on("send_message", async (data) => {
    socket.to(data.chatroomIndex).emit("receive_message", data);
    // Sending data to DB
    const { message, chatroom_id, user_id } = data;

    const newMessage = await messages.create({
      message: message,
      chatroom_id: chatroom_id,
      user_id: user_id,
    });

    console.log(newMessage);

    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});


app.use("/profile", userRouter);
app.use("/questionnaire", questionnaireRouter);


server.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
