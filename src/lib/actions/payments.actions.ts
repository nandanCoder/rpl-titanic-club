"use server";
import { dbConnect } from "@/lib/dbConnect";
import PaymentModel from "@/model/payment.model";

// get all payments in mongo db

// get previous month payments amount in mongo db
export async function getPayments() {
  const currentDate = new Date();
  currentDate.setDate(1);
  currentDate.setHours(0, 0, 0, 0);

  const lastMonthStart = new Date();
  lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
  lastMonthStart.setDate(1);
  lastMonthStart.setHours(0, 0, 0, 0);

  try {
    await dbConnect();
    const payments = await PaymentModel.aggregate([
      {
        $match: {
          status: "success",
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort payments by creation date in ascending order
      },
      {
        $lookup: {
          from: "users",
          localField: "clerkId",
          foreignField: "clerkId",
          as: "user",
          pipeline: [
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                username: 1,
                email: 1,
                number: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$user",
      },
      {
        $group: {
          _id: null,
          totalPayments: { $sum: "$amount" },
          thisMonthPayments: {
            $sum: {
              $cond: [{ $gte: ["$createdAt", currentDate] }, "$amount", 0],
            },
          },
          lastMonthPayments: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $lt: ["$createdAt", currentDate] },
                    { $gte: ["$createdAt", lastMonthStart] },
                  ],
                },
                "$amount",
                0,
              ],
            },
          },
          payments: { $push: "$$ROOT" }, // Store all payment details
        },
      },
    ]);

    return payments[0];
  } catch (error) {
    console.log(" this is an error when getting payments ", error);
  }
}

export async function getBigPayments() {
  try {
    await dbConnect();
    const payment = await PaymentModel.aggregate([
      {
        $match: {
          status: "success",
        },
      },
      {
        $sort: { createdAt: -1, amount: -1 }, // Sort payments by creation date in ascending order
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "users",
          localField: "clerkId",
          foreignField: "clerkId",
          as: "user",
          pipeline: [
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                username: 1,
                email: 1,
                number: 1,
                photoUrl: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          user: {
            $first: "$user",
          },
        },
      },
    ]);
    //console.log("server", payment);
    return payment;
  } catch (error) {
    console.log(" this is an error when getting payments ", error);
    return error;
  }
}
