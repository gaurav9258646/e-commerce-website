const express = require("express");
const categoryRoutes = require("./category.routes");
const productRoutes = require("./product.routes");
const { getAllUsers } = require("../../controllers/admin/user.controllers"); // ✅ fixed
const router = express.Router();

router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.get("/users", getAllUsers); // 
router.use("/user", require("./user.routes"));

module.exports = router;
