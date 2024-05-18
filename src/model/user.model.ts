import mongoose, { Schema, Document } from "mongoose";
import { boolean } from "zod";

export interface Iuser extends Document {
  // typescript type safty
  clerkId: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  number: string;
  isAdmin: boolean;
  createedAt: Date;
  payments: [];
}

const UserSchema: Schema<Iuser> = new Schema({
  clerkId: {
    type: String,
    required: [true, "clerkId is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    match: [/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim, "email is not valid"],
    trim: true,
    unique: true,
  },
  number: {
    type: String,
    required: [true, "number is required"],
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  photoUrl: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  createedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const UserModel =
  (mongoose.models.User as mongoose.Model<Iuser>) ||
  mongoose.model<Iuser>("User", UserSchema);

export default UserModel;
