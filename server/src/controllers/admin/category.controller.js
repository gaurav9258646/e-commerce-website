const {
  createCategory: createCategoryService,
  getAllCategories,
  updateCategory: updateCategoryService,
  deleteCategory: deleteCategoryService,
} = require("../../services/admin/category.service");

const { generateSlug } = require("../../utils");

const getCategories = async (req, res) => {
  try {
    const data = await getAllCategories();
    return res.json({ success: true, data:data });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, error: "Something went wrong!" });
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.json({
      success: false,
      error: "Name is required",
    });
  }

  const slug = generateSlug(name);

  try {
    const data = await createCategoryService(name, slug);
    return res.json({ success: true, data:data });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        error: "Category already exists",
      });
    }

    console.error(error);
    return res.json({ success: false, error: "Something went wrong!" });
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!id) {
    return res.json({
      success: false,
      error: "ID is required!",
    });
  }

  const slug = generateSlug(name);

  try {
    const data = await updateCategoryService(id, { name, slug });
    return res.json({
      success: true,
      message: "Category updated successfully!",
      data: data
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        error: "Category already exists!",
      });
    }

    console.error(error);
    return res.json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await deleteCategoryService(id);
    return res.json({
      success: true,
      message: "Category deleted successfully!",
      data:data
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
