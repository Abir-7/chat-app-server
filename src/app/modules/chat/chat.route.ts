import { Router } from "express";
import auth from "../../middleware/Auth/auth";
import { ChatController } from "./chat.controller";

const router = Router();
router.post(
  "/create-OnetoOne",
  auth("USER"),
  ChatController.createOnetoOneChat
);
router.post("/create-group", auth("USER"), ChatController.createGroupChat);
router.get("/get-user-group", auth("USER"), ChatController.getUserGroupChat);

export const ChatRouter = router;
