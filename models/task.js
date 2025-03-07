const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const TaskModel = mongoose.model("Task", taskSchema);
module.exports =TaskModel
