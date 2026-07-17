import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pc from "picocolors";
import user from "../models/user.js";
import z from "zod";


//creacion de un usuario
export async function createUser(name: string, email: string, password: string) {
  const userSchemaValidation = z.object({
    name: z.string().min(1),
    email: z.string().email().transform((val) => val.toLowerCase()),
    password: z.string().min(6),
  });

  const validationResult = userSchemaValidation.safeParse({ name, email, password });
  if (!validationResult.success) {
    console.error(
      pc.yellow(`Error creating user: ${pc.red(validationResult.error.toString())}`),
    );
    return null;
  }

  const data = {
    name: validationResult.data.name,
    email: validationResult.data.email,
    password: validationResult.data.password,
  }

  const newUser = new user({
    name: data.name,
    email: data.email,
    password: data.password,
  });
  return await newUser.save()
}

//Login y creacio de token de usuario
export async function loginUser(email: string, password: string) {
  const userDataValidation = z.object({
    email: z.string().email().transform((val) => val.toLowerCase()),
    password: z.string(),
  })
  const validationResult = userDataValidation.safeParse({ email, password });
  if (!validationResult.success) {
    console.log(pc.yellow(`Error logging in user: ${pc.red(validationResult.error.toString())}`))
    return null;
  }

  const data = {
    email: validationResult.data.email,
    password: validationResult.data.password,
  }

  const userMatch = await user.findOne({ email: data.email });
  if (!userMatch) return null;

  const isMatch = await bcrypt.compare(data.password, userMatch.password);
  if (!isMatch) return null;

  if (!process.env.JWT_SECRET) {
    console.error(pc.yellow(`Warning ⚠️: JWT_SECRET is not defined`));
    return null;
  }

  const token = jwt.sign({ id: userMatch._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}



