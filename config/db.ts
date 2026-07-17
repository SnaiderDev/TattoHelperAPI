import mongoose from "mongoose";
import dotenv from "dotenv";
import pc from "picocolors";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? "");
    console.log(pc.green("Successful connection to MongoDB!! ✅"));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(pc.yellow(`WARNING!!! ⚡\n${message}`));
    process.exit(1);
  }
};

export default connectDB;
