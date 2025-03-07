const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    const decoded = jwt.verify(token, process.env.KEY);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token, please log in again" });
  }
};

module.exports = authMiddleware;
