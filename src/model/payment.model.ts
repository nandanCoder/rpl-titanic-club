import mongoose, { Schema, Document } from "mongoose";

export interface Payment extends Document {
  ammount: number;
  createdAt: Date;
  status: boolean;
}
const PaymentSchema: Schema<Payment> = new Schema({
  ammount: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const PaymentModel =
  (mongoose.models.User as mongoose.Model<Payment>) ||
  mongoose.model<Payment>("Payment", PaymentSchema);

export default PaymentModel;
