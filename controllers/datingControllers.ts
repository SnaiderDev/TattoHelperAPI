import z from "zod";
import pc from "picocolors";
import dating from "../models/dating.js";



//creacion de citas
export async function createDating(
  name: string,
  email: string,
  sesions: number,
  timeAvg: number,
  unit: string,
  state: string,
  photo: string,
  value: number,
  userId: string
) {
  const dataValidation = z.object({
    name: z.string(),
    email: z.string(),
    sesions: z.number(),
    timeAvg: z.number(),
    unit: z.string().max(1),
    state: z.string().max(1),
    photo: z.string().default(""),
    value: z.number(),
    userId: z.string()
  });

  const validationResult = dataValidation.safeParse({
    name,
    email,
    sesions,
    timeAvg,
    unit,
    state,
    photo,
    value,
    userId
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
    sesions: validationResult.data.sesions,
    timeAvg: validationResult.data.timeAvg,
    unit: validationResult.data.unit,
    state: validationResult.data.state,
    photo: validationResult.data.photo,
    value: validationResult.data.value,
    userId: validationResult.data.userId
  })

  return await newDating.save()
}


//consulta de citas en db
export async function getDatings(){
 const datings = await dating.find();
 if(!datings){
    console.log(pc.yellow(`This is not possible!!`));
    return null;
 }
 return datings;
 
}