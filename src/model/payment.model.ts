import mongoose, { Schema, Document } from "mongoose";

export interface Payment extends Document {
  name: string;
  email: string;
  amount: number;
  createdAt: Date;
  status: "pending" | "processing" | "success" | "failed";
  paymentId: string;
  paymentScreenShot: string;
  clerkId: string;
  contributerId: object;
}
const PaymentSchema: Schema<Payment> = new Schema({
  contributerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentId: {
    type: String,
  },
  paymentScreenShot: {
    type: String,
  },
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export const PaymentModel =
  (mongoose.models.Payment as mongoose.Model<Payment>) ||
  mongoose.model<Payment>("Payment", PaymentSchema);

export default PaymentModel;
