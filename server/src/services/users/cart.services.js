const Cart = require("../../models/cart");

const getCartItemsDB = async (id) => {
  try {
    return await Cart.find({ user: id }).populate("item"); // Optional: remove .populate("item") if not needed
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

const addCartItemDB = async (user, item, quantity) => {
  try {
    // check if item is already in cart
    const cartItem = await Cart.findOne({ user, item });

    if (!cartItem) {
      const data = new Cart({ user, item, quantity });
      return await data.save();
    } else {
      // update quantity by adding to existing
      cartItem.quantity += quantity;
      return await cartItem.save();
    }
  } catch (error) {
    console.error("Error adding/updating cart item:", error);
    throw error;
  }
};

const updateCartItemDB = async (cartId, quantity) => {
  try {
    return await Cart.findByIdAndUpdate(cartId, { quantity }, { new: true });
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

module.exports = {
  getCartItemsDB,
  addCartItemDB,
  updateCartItemDB,
};
