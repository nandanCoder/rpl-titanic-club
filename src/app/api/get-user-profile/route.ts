import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

export async function GET() {
  console.log("all good");
  await dbConnect();
  const clerkId = "user_2hAPj2SY8CQh44RmDJPA4OZ1qWK";
  try {
    const userData = await UserModel.aggregate([
      {
        $match: {
          clerkId: clerkId,
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
                totalPayments: {
                  $sum: 1,
                },
                totalAmountPaid: {
                  $sum: "$amount",
                },
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
              $sort: { "payments.createdAt": -1 },
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

    console.log("User data", userData);
    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("error Something went wrong", { status: 500 });
  }
}
