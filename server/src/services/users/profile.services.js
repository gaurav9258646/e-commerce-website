
const Cart = require("../../models/cart");
const User= require("../../models/user");
const WishList = require("../../models/wishlist");
const profileUser=async(id)=>{
     const user = await User.findById(id).select("-password -__v");

  // get cart and wishlist
  const cart = await Cart.find({ user: user._id });
  const wishlist = await WishList.find({ user: user._id });

  return { user, cart, wishlist };
    // fetch addresses with user id
    return user;
};
module.exports={profileUser}