import { createOrUpdateUser } from "@/lib/actions/user.actions";

export async function GET() {
  console.log("all good");
  const data = {
    email: "nandanindia1947@gmail.com",
    clerkId: "user_2gfUPVoTehuGk8G9PXlZpkaINrg",
    number: "",
    username: "codernandan",
    firstName: "Nandan",
    lastName: "Manna",
    photoUrl:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZ2ZVUFpuMTBSMXE4OHF3VGJvcExaUGhQWGMifQ",
  };

  try {
    const res = await createOrUpdateUser(data);
    console.log("res ont", res);
    return new Response("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("error Something went wrong", { status: 500 });
  }
}
