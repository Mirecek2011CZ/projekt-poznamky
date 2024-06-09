const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories");

router.get("/", categoriesController.getAllCategories);


router.get("/:id", categoriesController.getCategoryById);

router.delete("/:id", categoriesController.deleteCategory);

router.put("/:id", categoriesController.updateCategory);

router.post("/", categoriesController.createCategory);

module.exports = router;
