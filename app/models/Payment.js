import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  username: {
    type: String,
  },
  productData: {
    type: [],
  },
  totalPrice: { type: Number },
});

const Payment =
  mongoose.models?.Payment || mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
