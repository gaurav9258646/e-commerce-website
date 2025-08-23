const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['UPI', 'Card', 'Cash'], required: true },
  status: { type: String, enum: ['Success', 'Failed', 'Pending'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;