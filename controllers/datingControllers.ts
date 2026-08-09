import z from "zod";
import pc from "picocolors";
import dating from "../models/dating.ts";



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
export async function getDatingsByUser(userId: string) {
   const datings = await dating.find({ userId });
   if (!datings || datings.length === 0) {
     console.log(pc.yellow(`No hay citas programadas para el usuario con ID ${userId}.`));
    return null;
 }
   return datings || [];
}
// Función para obtener la cita más próxima a la fecha actual
export async function nextDating(userId: string) {
  const datings = await dating.find({ userId }).lean();

  if (!datings || datings.length === 0) {
    console.log(pc.yellow(`No hay citas programadas para el usuario con ID ${userId}.`));
    return null;
  }

  // Convertir las fechas a objetos Date y calcular la diferencia absoluta en milisegundos
  const datedatings = datings.map((dating: any) => ({
    ...dating,
    dateDiff: Math.abs(new Date(dating.date).getTime() - new Date().getTime())
  }));

  // Encontrar el objeto con la menor diferencia de fecha
  datedatings.sort((a, b) => a.dateDiff - b.dateDiff);

  // Limpiar el campo dateDiff antes de retornar y devolver el resultado más cercano
  const closestDating = { ...datedatings[0] };
  delete closestDating.dateDiff;
  return closestDating;
}
