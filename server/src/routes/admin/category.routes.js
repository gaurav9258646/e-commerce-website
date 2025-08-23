const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../../controllers/admin/category.controller");

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
 