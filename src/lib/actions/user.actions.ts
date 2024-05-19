"use server";

import UserModel from "@/model/user.model";
import { dbConnect } from "../dbConnect";

export interface User {
  clerkId: string;
  photoUrl: string;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  number: string;
}

export async function createOrUpdateUser(userData: User) {
  console.log("this is the data", userData);
  try {
    await dbConnect();
    const newUser = await UserModel.create(userData);
    console.log("This is a user::", newUser);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log("this is an error when creating the user", error);
    return error;
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await dbConnect();
    const res = await UserModel.deleteOne({ clerkId: clerkId });
    // handale the errors
    return res;
  } catch (error) {
    console.log("this is an error when deleting the user", error);
    return error;
  }
}
