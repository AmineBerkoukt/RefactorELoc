import express from "express";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

// Route to get users for the sidebar (excluding logged-in user)
router.get("/users", getUsersForSidebar);

// Route to get messages between the logged-in user and another user
router.get("/:id", getMessages);

// Route to send a message
router.post("/send/:id", sendMessage);

export default router;
