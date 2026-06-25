
//exportacion de la funcion de la base de datos
import connectDB from "../config/db.js";
//exportacion routers
import express from 'express';
import needleRoutes from './routes/needleRoutes';

const app = express();
const PORT = 3000;

// Registrar el router para la ruta /needle/:shortname
app.use('/needle', needleRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
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
