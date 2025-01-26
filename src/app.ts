import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { noRouteFound } from "./app/middleware/noRoute";
import router from "./app/router";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import { Message } from "./app/modules/chat/message/message.model";

import { ChatService } from "./app/modules/chat/chat.service";
import { IMessage } from "./app/interface/message.interface";
const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: ["https://chatapp-client-beta.vercel.app", "*"], // Allow specific origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers)
  optionsSuccessStatus: 200, // Legacy browser support
};
app.use(cors(corsOptions));

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

// socket implimentetion

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chatapp-client-beta.vercel.app", // Allow all origins
    methods: ["GET", "POST"],
  },
});

const users = new Map();

io.on("connection", (socket) => {
  // console.log("A user connected: " + socket.id);

  // Store the socket ID when a user connects
  socket.on("register", (userId) => {
    users.set(userId, socket.id);
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  });

  // Handle sending messages one to one
  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    //  console.log(`Message from ${senderId} to ${receiverId}: ${message}`);

    // Get the receiver's socket ID
    const receiverSocketId = users.get(receiverId);

    const chat = await ChatService.createOnetoOneChat(senderId, receiverId);
    console.log(chat._id);
    const res = (await (
      await Message.create({
        chat: chat._id,
        content: message,
        sender: senderId,
      })
    ).populate({
      path: "sender",
      populate: { path: "customer" },
    })) as IMessage;
    console.log(res, "ggg");
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        sender: { _id: res.sender._id, name: res.sender?.customer.name },
        receiverId,
        content: res.content,
      });
    }
  });

  // Handle sending messages group
  socket.on("joinGroup", (chat) => {
    socket.join(chat);
    console.log(`User ${socket.id} joined group ${chat}`);
  });

  socket.on("sendMessageToGroup", async (data) => {
    const { chat, sender, content } = data;
    console.log(data);

    const res = (await (
      await Message.create({
        chat: chat,
        content,
        sender,
      })
    ).populate({
      path: "sender",
      populate: { path: "customer" },
    })) as IMessage;

    io.to(chat).emit("receiveGroupMessage", {
      sender: { _id: res.sender._id, name: res.sender?.customer.name },
      chat,
      content,
    });
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
