const express = require("express");
const authenticateUser = require("../middleware/authMiddleware");
const Item = require("../models/Item");

const router = express.Router();

// Post a Lost/Found Item (Protected Route)
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Item({
      title,
      description,
      category,
      location,
      user: req.user.id, // Logged-in user ID
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (err) {
    res.status(500).json({ message: "Error adding item", error: err.message });
  }
});

// Get All Lost/Found Items (Public Route)
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().populate("user", "name email"); // Populate user details
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items", error: err.message });
  }
});

// Get Items Posted by Logged-in User (Protected Route)
router.get("/my-items", authenticateUser, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user items", error: err.message });
  }
});

// Update an Item (Protected Route)
router.put("/:id", authenticateUser, async (req, res) => {
  try {
    const { title, description, category, location } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the logged-in user is the owner
    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this item" });
    }

    // Update fields if provided
    if (title) item.title = title;
    if (description) item.description = description;
    if (category) item.category = category;
    if (location) item.location = location;

    await item.save();
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (err) {
    res.status(500).json({ message: "Error updating item", error: err.message });
  }
});

// Delete an Item (Protected Route)
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the logged-in user is the owner
    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this item" });
    }

    await item.deleteOne();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item", error: err.message });
  }
});

// Export the router AFTER defining all routes
module.exports = router;
