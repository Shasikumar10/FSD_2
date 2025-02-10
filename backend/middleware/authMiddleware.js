const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token correctly

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user ID to request
    console.log("✅ Token verified successfully:", decoded);
    next();
  } catch (error) {
    console.error("❌ Invalid Token:", error.message);
    res.status(400).json({ message: "Invalid Token", error: error.message });
  }
};

module.exports = authenticateUser;
