import z from "zod";
import pc from "picocolors";
import sesion from "../models/sesion.ts";


export async function getSesions(){
    const sesions = await sesion.find();
    if(!sesions){
        console.log(pc.yellow(`Sesion is not found`));
        return null
    }
    return sesions;
}



export async function creacteSesion(commissionID: string, date: string) {
  const dataValidation = z.object({
    commissionId: z.string(),
    date: z.string().date(),
    state: z
      .string()
      .max(1)
      .transform((v) => v.toUpperCase()),
  });

  const validationResult = dataValidation.safeParse({
    commissionId: commissionID,
    date: date,
    state: "P",
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
    commissionId: validationResult.data.commissionId,
    date: validationResult.data.date,
    state: validationResult.data.state,
  };

  const newCommission = new sesion({
    commissionId: data.commissionId,
    date: data.date,
    state: data.state,
  });

  return await newCommission.save();
}

export async function updateSesion(sesionId: string, state: string) {
  const datavalidation = z.object({
    sesionId: z.string().min(1),
    state: z
      .string()
      .max(1)
      .transform((value) => value.toUpperCase()),
  });

  const validationResult = datavalidation.safeParse({
    sesionId,
    state,
  });

  if (!validationResult.success) {
    console.error(
      pc.yellow(
        `Error al actualizar sesión: ${pc.red(validationResult.error.toString())}`,
      ),
    );
    return null;
  }

  const updatedSesion = await sesion.findByIdAndUpdate(
    validationResult.data.sesionId,
    { state: validationResult.data.state },
    { new: true },
  );

  return updatedSesion;
}

export async function updateDateSesion(sesionId: string, date: string) {
  const datavalidation = z.object({
    sesionId: z.string().min(1),
    date: z.string().date()
  });

  const validationResult = datavalidation.safeParse({
    sesionId, date,
  });

  if (!validationResult.success) {
    console.error(
      pc.yellow(
        `Error al actualizar sesión: ${pc.red(validationResult.error.toString())}`,
      ),
    );
    return null;
  }

  const updatedSesion = await sesion.findByIdAndUpdate(
    validationResult.data.sesionId,
    { state: validationResult.data.date },
    { new: true },
  );

  return updatedSesion;
}
