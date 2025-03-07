const express = require("express");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();
const dotenv = require("dotenv");

dotenv.config();
userRoute.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hasPass = await bcrypt.hash(password, 4);

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new UserModel({ name, email, password: hasPass });
    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "User registered faild" });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    const passwordcheck = bcrypt.compare(password, user.password);
    if (!passwordcheck) {
      res.status(400).json({ message: "wrong password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.KEY);
    const obj = {
      user: user.email,
      token: token,
    };
    res.status(200).json(obj);
  } catch (error) {
    res.status(400).json({ message: "User login faild" });
  }
});

module.exports = userRoute;
