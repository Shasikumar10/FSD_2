const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Send a message
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { receiverId, itemId, message } = req.body;
    const newMessage = new Message({ senderId: req.user, receiverId, itemId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
});

// ✅ Get messages for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ receiverId: req.user }).populate("senderId", "name email");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving messages", error });
  }
});

module.exports = router;
