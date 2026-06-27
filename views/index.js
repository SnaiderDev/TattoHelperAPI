import express from 'express';
import pc from 'picocolors'
//exportacion de la funcion de la base de datos
import connectDB from "../config/db.js";
//exportacion routers
import needleRoutes from '../routes/needleRoute.js';

const app = express();
const PORT = 3000;

// Registrar el router para la ruta /needle/:shortname
app.use('/needles', needleRoutes);


//comprobacion de la disponibilidad del puerto
const port = process.env.port || 3000;

//Se ejecuta una funcion asincronica con el fin de comprobar la conexion a de la base de datos previamente
const runServer = async () => {
  /*
   Solo es necesario realizar una sola vez la consulta a la base de datos siempre
   y cuando esta sea exitosa
  */
  await connectDB();
  app.listen(port, () => {
    console.log(pc.green(`Server is listening in ${pc.blue(`http://localhost:${port}`)} ⬅️`));
  });
};

runServer();
