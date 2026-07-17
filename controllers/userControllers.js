import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pc from "picocolors";
import user from "../models/user.js";
import z from "zod";

//creacion de un usuario
export async function createUser(name, email, password) {
  //declaracion de reglas antes de pasar los datos al modelo de usuario
  const userSchemaValidation = z.object({
    nameObj: z.string(),
    emailDataObj: z.string().email().lowercase(),
    passwordObj: z.string().min(6),
  });
  //comprobacion de los datos

  const validationResult = userSchemaValidation.safeParse({
    nameObj: name,
    emailObj: email,
    passwordObj: password,
  });
  if (!validationResult.success) {
    console.error(pc.yellow(`Error creating user: ${pc.red(validationResult.error)}`));
    return null;
  } else {
    console.log(validationResult.data)
    const { name, email, password } = validationResult.data;
    console.log(name, emailObj, passwordObj);
    const newUser = new user({ nameObj, emailObj, passwordObj });
    return await newUser.save();
  }
}

//Login y creacio de token de usuario
export async function loginUser(email, password) {
  const userMatch = await user.findOne({ email });
  if (!userMatch) return null;

  const isMatch = await bcrypt.compare(password, userMatch.password);
  if (!isMatch) return null;

  if (!process.env.JWT_SECRET) {
    console.error(pc.yellow(`Warning ⚠️: JWT_SECRET is not defined`));
    return null;
  }
  //si se encuentra un usuario y la contraseña es correcta se crear el token de usuario con la dutracion parametrizada
  const token = jwt.sign({ id: userMatch._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}
