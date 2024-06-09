import { sendPaymentEmail } from "@/helpers/sendPaymentEmail";
import { dbConnect } from "@/lib/dbConnect";
import PaymentModel, { Payment } from "@/model/payment.model";
import UserModel from "@/model/user.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email, name, amount, paymentId, paymentScreenShot } =
      await request.json();
    if (!amount) {
      return Response.json(
        {
          success: false,
          message: "Amount is required",
        },
        {
          status: 400,
        }
      );
    }
    const { userId }: { userId: string | null } = auth();
    if (!userId) {
    } // do some thing
    const user = await UserModel.findOne({ clerkId: userId });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found 🥴🥴",
        },
        {
          status: 400,
        }
      );
    }
    console.log("PAyment id::", paymentId);
    const alreadyDonated = await PaymentModel.findOne({
      paymentId,
    });
    console.log("alreadyDonated:::", alreadyDonated);
    if (alreadyDonated) {
      return Response.json(
        {
          success: false,
          message:
            " You have  Already donated this  for this Payment Id or Payment Screenshot 🥴🥴",
        },
        {
          status: 400,
        }
      );
    }
    const donation = await PaymentModel.create({
      name: name || user.firstName + " " + user.lastName,
      email: email || user.email,
      amount: Number(amount),
      paymentId,
      paymentScreenShot,
      clerkId: userId,
      contributerId: user._id,
    });

    if (!donation) {
      return Response.json(
        {
          success: false,
          message: "Donation not created 🤔🤔",
        },
        {
          status: 400,
        }
      );
    }
    await UserModel.findByIdAndUpdate(
      user._id,
      {
        $push: { payments: donation._id },
      },
      {
        new: true,
      }
    );
    const sendEmailRes = await sendPaymentEmail({
      userName: donation.name,
      email: donation.email,
      amount: donation.amount,
      paymentId: donation.paymentId,
      paymentScreenShot: donation.paymentScreenShot,
      id: donation._id.toString(),
      paymentDate: donation.createdAt,
    });
    if (!sendEmailRes.success) {
      //console.log("Email not send :: ", sendEmailRes);
    }

    // console.log("Donation email:::", sendEmailRes);
    return Response.json(
      {
        success: true,
        message: "Donated successfully 😎",
        data: donation,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("Donation error", error);
    return Response.json(
      {
        success: false,
        message: "Somthing went wrong please try again 🤷‍♂️🤷‍♀️",
        date: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
