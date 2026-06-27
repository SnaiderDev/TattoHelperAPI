import mongoose from "mongoose";
import dotenv from "dotenv";
import pc from "picocolors";
//importacion de las variables de entorno
dotenv.config();

//conexion inicial a la base de datos para toda consulta
const connectDB = async () => {
  try {
    //comprobacion de la base de datos
    await mongoose.connect(process.env.MONGO_URI);
    console.log(pc.green("Successful connection to MongoDB!! ✅"));
  } catch (error) {
    console.error(pc.yellow(`WARNING!!! ⚡\n${error}`));
    process.exit(1); // Terminar el proceso si hay un error
  }
};

export default connectDB;
