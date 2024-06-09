import { dbConnect } from "@/lib/dbConnect";
import PaymentModel from "@/model/payment.model";

// get all payments in mongo db

// get previous month payments amount in mongo db
export async function GET() {
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

    if (!payments) {
      return Response.json(
        {
          success: false,
          message: " No payments found at the moment",
        },
        { status: 300 }
      );
    }
    return Response.json(
      {
        success: true,
        message: " payments found success ",
        data: {
          totalPayments: payments[0].totalPayments,
          thisMonthPayments: payments[0].thisMonthPayments,
          lastMonthPayments: payments[0].lastMonthPayments,
        },
        payments: payments[0].payments,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(" this is an error when getting payments ", error);
    return Response.json(
      {
        success: false,
        message: "An unexpected error occured",
        error: error,
      },
      {
        status: 400,
      }
    );
  }
}
