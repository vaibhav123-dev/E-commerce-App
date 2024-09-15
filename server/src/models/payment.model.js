import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  paymentMethod: { type: String },
  paymentResult: {
    id: String,
    status: String,
    updateTime: String,
    emailAddress: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidAt: Date,
});

export const Payment = mongoose.model("Payment", paymentSchema);
