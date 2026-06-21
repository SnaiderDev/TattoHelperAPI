import express from "express";
//exportacion de la funcion de la base de datos
import connectDB from "../config/db.js";
//exportacion del primer modelo
import project from "../models/project.js";

const app = express();

//Retorno de informacion de proyectos
app.get("/", async (req, res) => {
  try {
    const data = await project.find({}); // Buscar todos los proyectos
    res.json(data); // Responder con el JSON correctamente
  } catch (error) {
    console.error("This is not possible ", error);
    res.status(500).json({ error: "This is not possible " });
  }
});


//comprobacion de la disponibilidad del puerto
const port = process.env.port ?? 3000;

//Se ejecuta una funcion asincronica con el fin de comprobar la conexion a de la base de datos previamente
const runServer = async () => {
  /*
   Solo es necesario realizar una sola vez la consulta a la base de datos siempre
   y cuando esta sea exitosa
  */
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is listening in http://localhost:${port}`);
  });
};

runServer();
