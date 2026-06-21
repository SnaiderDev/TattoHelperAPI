// config/db.js
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Terminar el proceso si hay un error
  }
};

export default connectDB;
