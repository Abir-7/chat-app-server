import { Router } from "express";
import { MessageController } from "./message.controller";
import auth from "../../../middleware/Auth/auth";

const router = Router();

router.post("/send-message", auth("USER"), MessageController.saveChatMessage);
router.get("/get-message", auth("USER"), MessageController.getChatMessages);
export const MessageRouter = router;
