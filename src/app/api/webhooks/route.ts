import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import {
  User,
  createOrUpdateUser,
  deleteUser,
} from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  // do your work
  if (evt.type === "user.created" || evt.type === "user.updated") {
    // do something
    const user = evt.data;
    // clin up this code
    const newUser: User = {
      email: user.email_addresses[0].email_address,
      clerkId: user.id,
      number: user.phone_numbers[1].phone_number || "",
      username: user.username || "",
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      photoUrl: user.image_url,
    };
    try {
      await createOrUpdateUser(newUser);
      console.log("user created or updated successfully");
      return new Response(" User created or updated successfully ", {
        status: 200,
      });
    } catch (error) {
      console.log(
        "this is an error when creating or updating the user  :: ",
        error
      );
      return new Response("Error occured when creating or updating the user ", {
        status: 400,
      });
    }
  }
  if (evt.type === "user.deleted") {
    // do something
    try {
      await deleteUser(evt.data.id || "");
      return new Response("user deleted successfully from Database", {
        status: 200,
      });
      console.log("user deleted successfully from Database");
    } catch (error) {
      console.log("this is an error when deleting the user  :: ", error);
      return new Response("Error occured when deleting the user ", {
        status: 400,
      });
    }
  }

  return new Response("", { status: 200 });
}
