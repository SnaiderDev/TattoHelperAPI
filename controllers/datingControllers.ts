import z from "zod";
import pc from "picocolors";
import dating from "../models/dating.js";

export async function createDating(
  name: string,
  email: string,
  sesion: number,
  timeAvg: number,
  unit: string,
  state: string,
  photo: string,
  value: number,
) {
  const dataValidation = z.object({
    name: z.string(),
    email: z.string(),
    sesion: z.number(),
    timeAvg: z.number(),
    unit: z.string().max(1),
    state: z.string().max(1),
    photo: z.string().default(""),
    value: z.number(),
  });

  const validationResult = dataValidation.safeParse({
    name,
    email,
    sesion,
    timeAvg,
    unit,
    state,
    photo,
    value,
  });

    if (!validationResult.success) {
    console.error(
      pc.yellow(`Error al crear usuario: ${pc.red(validationResult.error.toString())}`),
    );
    return null;
  }

  const newDating = new dating({
    name: validationResult.data.name,
    email: validationResult.data.email,
    sesion: validationResult.data.sesion,
    timeAvg: validationResult.data.timeAvg,
    unit: validationResult.data.unit,
    state: validationResult.data.state,
    photo: validationResult.data.photo,
    value: validationResult.data.value
  })

  return await newDating.save()
}
