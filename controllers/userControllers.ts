import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pc from "picocolors";
import user from "../models/user.ts";
import z from "zod";

// Creación de un usuario
export async function createUser(name: string, email: string, password: string, overview: string, photo: string) {
  //Maquetacion de datos de entrada
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
  //comprobacion de datos
  const validationResult = userSchemaValidation.safeParse({name,email,password,overview,photo});

  if (!validationResult.success) {
    console.error(pc.yellow(`Error al crear usuario: ${pc.red(validationResult.error.toString())}`));
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

// Inicio de sesión y creación del JWT  de usuario
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

  const token = jwt.sign({ userId: userMatch._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log(token);
  return token;
}

export async function tokenVerification(token: string) {
  try {
    if (!process.env.JWT_SECRET) {
      console.log(pc.yellow(`JWT_SECRET is not defined!! ⚠️`));
      return null;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(pc.green(`Token verificado correctamente ✅`));
    return decoded

  } catch (error) {
    console.log(pc.yellow('This is not possible!'))
    return null;
  }
}
