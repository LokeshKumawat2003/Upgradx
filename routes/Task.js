const express = require("express");
const TaskModel = require("../models/task");
const authMiddleware = require("../middleware/authmiddle");

const taskRoute = express.Router();

taskRoute.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, category, user } = req.body;
    const newTask = new TaskModel({ title, description, category, user });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

taskRoute.get("/", authMiddleware, async (req, res) => {
  try {
    const { category, user } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (user) filter.user = user;

    const tasks = await TaskModel.find(filter).populate("category");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

taskRoute.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id).populate("category");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

taskRoute.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

taskRoute.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = taskRoute;
