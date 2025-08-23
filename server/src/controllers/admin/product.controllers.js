const {
  getProductsDB,
  createProductDB,
  updateProductDB,
  deleteProductDB,
  getProductInfoDB,
  addProductImagesDB,
  deleteProductImageDB,
} = require("../../services/admin/product.services");

const { generateSlug } = require("../../utils");
const { deleteImage } = require("../../utils");


const getProducts = async (req, res) => {
  try {
    const data = await getProductsDB();
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};
const getProductInfo = async (req, res) => {
  const { slug } = req.params;

  try {
    const data = await getProductInfoDB({ slug });
    if (!data) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};


const createProduct = async (req, res) => {
  const { title, description, price, mrp, rating, stock, category, images } = req.body;

  // validation
  if (!title || !description || !price || !mrp || !rating || !category) {
    return res.json({
      success: false,
      error: "All fields are required",
      required: ["title", "description", "price", "mrp", "rating", "category"],
    });
  }

  const slug = generateSlug(title);

  if (mrp < price) {
    return res.json({
      success: false,
      error: "MRP should be greater than price",
    });
  }

  try {
    const data = await createProductDB({
      title,
      slug,
      description,
      price,
      mrp,
      rating,
      stock,
      category,
      images,
    });
    return res.json({ success: true, data });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ success: false, error: "Product already exists" });
    }
    return res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (body.title) {
    body.slug = generateSlug(body.title);
  }

  try {
    const data = await updateProductDB(id, body);
    return res.json({ success: true, data });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ success: false, error: "Product already exists" });
    }
    return res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};


const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteProductDB(id);
    return res.json({ success: true, data: "Product deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};


const addProductImages = async (req, res) => {
  const {images } = req.body;

  if (!images) {
    return res.json({
      success: false,
      error: "All fields are required",
      required: ["productId", "images"],
    });
  }

  try {
    const data = await addProductImagesDB(images);
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};



const deleteProductImage = async (req, res) => {
  const { productId, public_id } = req.body;

  if (!productId || !public_id) {
    return res.json({
      success: false,
      error: "All fields are required",
      required: ["productId", "public_id"],
    });
  }

  try {
    // delete from cloudinary
    const result = await deleteImage(public_id);
    if (!result.success) {
      return res.json({ success: false, error: result.error || "Something went wrong!" });
    }

    // delete from db
    await deleteProductImageDB(productId, public_id);
    return res.json({ success: true, data: "Image deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};


module.exports = {
  getProducts,
  getProductInfo,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductImages,
  deleteProductImage,
};
