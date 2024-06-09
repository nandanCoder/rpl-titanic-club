import { dbConnect } from "@/lib/dbConnect";
import PaymentModel from "@/model/payment.model";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
) {
  console.log("user param ::::::", params.userId);
  if (!params) {
    return Response.json(
      { success: false, message: "No user found " },
      { status: 401 }
    );
  }
  await dbConnect();
  try {
    const payments = await PaymentModel.aggregate([
      {
        $match: {
          contributerId: new mongoose.Types.ObjectId(params.userId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          status: 1,
          createdAt: 1,
          contributerId: 1,
        },
      },
    ]);
    console.log("this is the payments", payments);
    if (!payments) {
      return Response.json(
        { success: false, message: "No payments found" },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Payments found success  ",
        payments: payments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("this is an error when getting the user payments", error);
    return Response.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
