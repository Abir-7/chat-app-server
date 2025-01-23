import { Router } from "express";
import { MessageController } from "./message.controller";
import auth from "../../middleware/Auth/auth";

const router = Router();

router.post("/send-message", MessageController.saveChatMessage);
router.get("/get-message", MessageController.getChatMessages);
export const MessageRouter = router;
