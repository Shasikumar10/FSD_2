const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes"); // Moved up

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); // ✅ Placed before server starts

const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

// Use HTTP server instead of app.listen
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }, 
});

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("newItem", (item) => {
    io.emit("updateItems", item); // Send to all users
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

// Start the server
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
