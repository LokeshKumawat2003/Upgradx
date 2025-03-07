const express = require("express");
const CategoryModel = require("../models/category");
const categoryRoute = express.Router();

categoryRoute.post("/", async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const newCategory = new CategoryModel({ category });
    await newCategory.save();
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
});

categoryRoute.get("/", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
});

module.exports = categoryRoute;
