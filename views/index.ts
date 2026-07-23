import express from 'express';
import pc from 'picocolors'
//exportacion de la funcion de la base de datos
import connectDB from "../config/db.js";
//exportacion routers
import needleRoutes from '../routes/needleRoute.js';
import userRoutes from '../routes/userRoute.js';
import commissionRoutes from '../routes/commissionIRoute.js'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

// Middleware para parsear JSON las respuestas http
app.use(express.json());
// Registrar el router para la ruta /needle/:shortname
app.use('/needles', needleRoutes);
app.use('/users', userRoutes);
app.use('/commissions',commissionRoutes )
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

