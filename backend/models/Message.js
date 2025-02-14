const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
