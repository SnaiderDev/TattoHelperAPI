import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pc from "picocolors";
import user from "../models/user.ts";
import z from "zod";

// Creación de un usuario
export async function createUser(
  name: string,
  email: string,
  password: string,
  overview: string,
  photo: string,
) {
  const userSchemaValidation = z.object({
    name: z.string().min(1),
    email: z
      .string()
      .email()
      .transform((val) => val.toLowerCase()),
    password: z.string().min(6),
    overview: z.string().max(100),
    photo: z.string(),
  });

  const validationResult = userSchemaValidation.safeParse({
    name,
    email,
    password,
    overview,
    photo,
  });
  if (!validationResult.success) {
    console.error(
      pc.yellow(
        `Error al crear usuario: ${pc.red(validationResult.error.toString())}`,
      ),
    );
    return null;
  }

  const data = {
    name: validationResult.data.name,
    email: validationResult.data.email,
    password: validationResult.data.password,
    overview: validationResult.data.overview,
    photo: validationResult.data.photo,
  };

  const newUser = new user({
    name: data.name,
    email: data.email,
    password: data.password,
    overview: data.overview,
    photo: data.photo,
  });
  return await newUser.save();
}

// Inicio de sesión y creación del token de usuario
export async function loginUser(email: string, password: string) {
  const userDataValidation = z.object({
    email: z
      .string()
      .email()
      .transform((val) => val.toLowerCase()),
    password: z.string(),
  });

  const validationResult = userDataValidation.safeParse({ email, password });
  if (!validationResult.success) {
    console.log(
      pc.yellow(
        `Error al iniciar sesión del usuario: ${pc.red(validationResult.error.toString())}`,
      ),
    );
    return null;
  }

  const data = {
    email: validationResult.data.email,
    password: validationResult.data.password,
  };

  // Find user by email
  const userMatch = await user.findOne({ email: data.email });
  if (!userMatch) return null;

  const isMatch = await bcrypt.compare(data.password, userMatch.password);
  if (!isMatch) return null;

  if (!process.env.JWT_SECRET) {
    console.error(pc.yellow(`Advertencia ⚠️: JWT_SECRET no está definido`));
    return null;
  }

  const token = jwt.sign({ id: userMatch._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

export async function tokenVerificaction(token: string) {
  try {
    if (!process.env.JWT_SECRET) {
      console.log(pc.yellow(`JWT_SECRET is not defined!! ⚠️`));
      return null;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log(pc.yellow('This is not possible!'))
    return null;
  }
}

// Función para actualizar un usuario
export async function updateUser(userId: string, newData: object) {
  // Validar estructura de entrada
  const schema = z.object({
    overview: z.string().max(100),
    photo: z.string(),
  });

  const validationResult = schema.safeParse(newData);
  if (!validationResult.success) {
    console.error(
      pc.yellow(
        `Error de validación al actualizar usuario ${pc.red(validationResult.error.toString())}`,
      ),
    );
    return null;
  }

  const existingUser = await user.findOne({ _id: userId });
  if (!existingUser) {
    console.log(pc.yellow("Usuario no encontrado"));
    return null;
  }

  // Actualizar solo los campos proporcionados
  const updateFields: Record<string, any> = {};
  if ("overview" in newData) updateFields.overview = newData.overview;
  if ("photo" in newData) updateFields.photo = newData.photo;

  const result = await user.updateOne({ _id: userId }, { $set: updateFields });
  return existingUser; // Retornar el objeto del usuario actualizado
}

export async function deleteUser(userId: string) {
  return await user.deleteOne({ _id: userId });
}
