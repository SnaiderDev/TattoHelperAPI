import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import connectDB from "../config/db.js";
import project from "../models/project.js";

const app = express();

//Retorno de informacion de proyectos
app.get("/", async (req, res) => {
  try {
    const data = await project.find({}); // Buscar todos los proyectos
    res.json(data); // Responder con el JSON correctamente
  } catch (error) {
    console.error("This is not possible ", error);
    res
      .status(500)
      .json({ error: "This is not possible " });
  }
});

const port = process.env.port ?? 3000;

//Se ejecuta una funcion asincronica con el fin de comprobar la conexion a de la base de datos previamente
const runServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is listening in http://localhost:${port}`);
  });
};

runServer();
