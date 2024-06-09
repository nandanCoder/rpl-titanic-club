import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { ApiResponse } from "@/types/ApiResponce";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    const { userId } = auth();
    const user = await UserModel.findOne({ clerkId: userId });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found ",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User found success ",
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "An unexpcted error occured: ",
      },
      { status: 401 }
    );
  }
}
