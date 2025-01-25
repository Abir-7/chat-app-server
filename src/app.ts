import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { noRouteFound } from "./app/middleware/noRoute";
import router from "./app/router";
import cookieParser from "cookie-parser";
import http from "http";
import { Server, Socket } from "socket.io";
import { JwtHelper } from "./app/utils/shared/jwtHelper";
import { config } from "./app/config";
import AppError from "./app/errors/AppError";
import { IAuthData } from "./app/middleware/Auth/auth.interface";
import { Message } from "./app/modules/chat/message/message.model";
import { Chat } from "./app/modules/chat/chat.model";
import { ChatService } from "./app/modules/chat/chat.service";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

////////////////
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
//////////////

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.use(noRouteFound);
app.use(globalErrorHandler);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

const users = new Map();

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Store the socket ID when a user connects
  socket.on("register", (userId) => {
    users.set(userId, socket.id);
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  });

  // Handle sending messages
  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    console.log(`Message from ${senderId} to ${receiverId}: ${message}`);

    // Get the receiver's socket ID
    const receiverSocketId = users.get(receiverId);

    // If receiver is connected, send the message
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", { senderId, message });
      const chat = await ChatService.createOnetoOneChat(senderId, receiverId);
      console.log(chat._id);
      await Message.create({
        chat: chat._id,
        content: message,
        sender: senderId,
      });
    }
  });

  socket.on("disconnect", () => {
    // Remove user from the mapping when they disconnect
    users.forEach((socketId, userId) => {
      if (socketId === socket.id) {
        users.delete(userId);
        console.log(`User ${userId} disconnected`);
      }
    });
  });
});

export { app, server };
