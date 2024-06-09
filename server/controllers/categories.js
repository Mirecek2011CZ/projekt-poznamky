const Category = require("../models/categories");

exports.getAllCategories = async (req, res) => {
  try {
    const result = await Category.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Categories found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Categories not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const result = await Category.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Category found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Category not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const result = await Category.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Category deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const data = {
      category: req.body.category,
    };
    const result = await Category.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Category updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Category was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const data = new Category({
      category: req.body.category,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Category created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Category was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
