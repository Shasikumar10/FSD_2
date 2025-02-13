const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token correctly

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user details to request
    console.log("✅ Token verified successfully:", decoded);
    next();
  } catch (error) {
    console.error("❌ Invalid Token:", error.message);
    res.status(401).json({ message: "Invalid Token", error: error.message });
  }
};

module.exports = authenticateUser;
