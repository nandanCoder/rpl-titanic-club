import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

export async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection Failed", error);
    process.exit(1);
  }
}
