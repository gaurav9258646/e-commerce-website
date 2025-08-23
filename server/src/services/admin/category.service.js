const Category = require("../../models/category");
const Product = require("../../models/product");

const getAllCategories = async () => {
  const categories = await Category.find({}).lean(); 

  const categoriesWithTotals = await Promise.all(
    categories.map(async (cat) => {
      const total = await Product.countDocuments({ category: cat._id });
      return { ...cat, total };
    })
  );
  return categoriesWithTotals;
};

const createCategory = async (name, slug) => {
  const newCategory = new Category({ name, slug });
  return await newCategory.save();
};

const updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
