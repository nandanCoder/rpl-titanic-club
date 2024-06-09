"use server";

import UserModel from "@/model/user.model";
import { dbConnect } from "../dbConnect";
import { auth } from "@clerk/nextjs/server";

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
  await dbConnect();
  console.log("this is the data::", userData);
  try {
    const newUser = await UserModel.findOneAndUpdate(
      { clerkId: userData.clerkId },
      {
        $set: userData,
      },
      { upsert: true, new: true }
    );
    console.log("This is a userL:::", newUser);
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

export async function getUsers() {
  try {
    await dbConnect();
    const res = await UserModel.find({});
    // handale the errors
    if (!res) {
      return "No user found in the database 🥴";
    }

    //    console.log("this is a userL:::", res);
    return res.length;
  } catch (error) {
    console.log("this is an error when getting the user", error);
    return error;
  }
}

export async function getUserProfile() {
  await dbConnect();
  const { userId } = auth();
  //console.log("cleark Id::::", userId);
  try {
    const userData = await UserModel.aggregate([
      {
        $match: {
          clerkId: userId,
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "payments",
          foreignField: "_id",
          as: "paymentDetails",
          pipeline: [
            {
              $group: {
                _id: "$status",
                count: {
                  $sum: 1,
                },
                totalAmount: {
                  $sum: "$amount",
                },
              },
            },
            {
              $project: {
                _id: 0,
                status: "$_id",
                totalAmount: 1,
                count: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "payments",
          foreignField: "_id",
          as: "payments",
          pipeline: [
            {
              $sort: { createdAt: -1 },
            },
            {
              $limit: 5,
            },
            {
              $project: {
                contributerId: 0,
                paymentId: 0,
                paymentScreenShot: 0,
                clerkId: 0,
              },
            },
          ],
        },
      },
    ]);

    //console.log("User data", userData);
    return userData[0];
  } catch (error) {
    console.log(error);
    return error;
  }
}
