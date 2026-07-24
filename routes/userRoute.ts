import express from "express";
import pc from "picocolors";

import {
  createUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../controllers/userControllers.ts";
import cookieParser from "cookie-parser";

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
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    if (!token) {
      return res.status(404).json({ message: "Credenciales inválidas" });
    }
    console.log(pc.green(`¡Listo! Usuario logueado con éxito ⚡`));
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS en producción
      sameSite: "strict",
      maxAge: 30 * 1000,
    });
    return res.status(200).json({ token });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(
      pc.yellow(
        `Error al intentar iniciar sesión del usuario: ${pc.red(message)}`,
      ),
    );
    res.status(500).json({ message: "Error al iniciar sesión del usuario" });
  }
});

router.post("/update", async (req, res) => {
  const { id, newData } = req.body;
  if (!id) {
    return res.status(400).json({ message: "ID de usuario es obligatorio" });
  }

  try {
    // Asegurar que newData esté correctamente tipado y validado
    const updatedUser = await updateUser(id, newData);
    if (updatedUser) {
      console.log(
        pc.green(
          `Datos del usuario con ID ${pc.blue(id)} actualizados exitosamente`,
        ),
      );
      return res
        .status(200)
        .json({ message: "Datos del usuario actualizados correctamente" });
    } else {
      return res
        .status(400)
        .json({ message: "No se pudo actualizar los datos del usuario" });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(
      pc.yellow(`Error al actualizar usuario ${pc.red(id)}: ${message}`),
    );
    return res
      .status(500)
      .json({ message: "Error interno al actualizar datos" });
  }
});

router.post("/delete", async (req, res) => {
  const { id } = req.body as { id?: string };

  if (!id) {
    return res.status(400).json({ message: "ID del usuario es obligatorio" });
  }

  try {
    await deleteUser(id);
    return res.status(202).json({
      message: "El usuario fue eliminado exitosamente",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(pc.yellow(`Error al eliminar usuario: ${pc.red(message)}`));
    return res.status(500).json({ message: "Error al eliminar usuario" });
  }
});

export default router;
