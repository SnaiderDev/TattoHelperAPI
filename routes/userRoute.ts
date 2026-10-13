import express from "express";
import pc from "picocolors";
import cookieParser from "cookie-parser";
import {createUser,loginUser} from "../controllers/userControllers.ts";


const router = express.Router();

//configuracion inicial para acceder a las cookies del navegador
router.use(cookieParser());

//creación de usuario
router.post("/create", async (req, res) => {
  console.log(
    pc.green(`Creando usuario con datos: ${pc.blue(JSON.stringify(req.body))}`),
  );
  const { name, email, password, overview, photo } = req.body;
  const user = await createUser(name, email, password, overview, photo);
  if (user) {
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } else {
    res.status(400).json({ message: "Error al crear usuario" });
  }
});

//logeo de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //Obtencion de token en JWT y guardado de la informacion en cookies
    const token = await loginUser(email, password);
    if(!token){
      return res.status(401).json({ message: "Credenciales inválidas ⚠️" });
    }
    res.cookie("authToken",token, { httpOnly: true, secure: true,  sameSite: "lax", maxAge: 60 * 60 * 1000});
    res.status(200).json({ message: "Inicio de sesión exitoso ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión del usuario" });
  }
});

export default router;
