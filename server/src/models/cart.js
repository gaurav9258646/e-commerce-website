const  momgoose = require("mongoose");

const  cartSchema  = new momgoose.Schema({
    user: {type: momgoose.Schema.Types.ObjectId,ref: "User",require: true},
    item: {type: momgoose.Schema.Types.ObjectId,ref:"Product", require:true},
    quantity:{type:Number,require: true,min:1}
});

const  Cart = momgoose.model("cart", cartSchema);
module.exports = Cart;