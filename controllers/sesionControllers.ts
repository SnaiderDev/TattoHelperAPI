import z from "zod";
import pc from "picocolors";
import sesion from "../models/sesion.ts";
import commission from "../models/commission.ts";


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

/**
 * Encuentra la sesión más cercana a la fecha actual, filtrando por un usuario
 * cuyas comisiones estén activas (no finalizadas ni canceladas).
 */
export async function nextSesion(userId: string): Promise<any | null> {
  // 1. Encontrar todas las comisiones activas del usuario
  const activeCommissions = await commission.find({
    userId: userId,
    state: { $nin: ["f-finished", "c-canceled"] } // Filtra por estados activos (PENDING o cualquier otro no final/cancelado)
  }).select('$_id');

  if (!activeCommissions || activeCommissions.length === 0) {
    console.log(pc.yellow(`No active commissions found for user ID: ${userId}`));
    return null;
  }

  const commissionIds = activeCommissions.map(c => c._id);
  
  // 2. Consultar todas las sesiones asociadas a esas comisiones activas
  const sessions = await sesion.find({ commissionId: { $in: commissionIds } });

  if (!sessions || sessions.length === 0) {
    console.log(pc.yellow(`No sessions found for active commissions linked to user ID: ${userId}`));
    return null;
  }

  // 3. Determinar la sesión más cercana a la fecha actual (Lógica de minimización de tiempo absoluto)
  const now = new Date();
  let closestSession: any | null = null; // Using any to accommodate Mongoose Document type returned from find()
  let minTimeDifference: number = Infinity;

  for (const session of sessions) {
    // Intentamos parsear la fecha almacenada en el documento de sesión.
    const sessionDate = new Date(session.date);

    if (isNaN(sessionDate.getTime())) {
        continue; // Saltar sesiones con fechas inválidas
    }

    // Calculamos la diferencia absoluta en milisegundos.
    const timeDifference = Math.abs(now.getTime() - sessionDate.getTime());

    if (timeDifference < minTimeDifference) {
      minTimeDifference = timeDifference;
      closestSession = session;
    }
  }

  // 4. Retornar la sesión más cercana
  
  // 4. Retornar la sesión más cercana
  return closestSession;
}


  
/**
 * Marca una sesión como finalizada (estado 'F').
 * @param sesionId El ID de la sesión a finalizar.
 */
export async function finishSession(sesionId: string) {
  // Valida que el ID de sesión proporcionado sea un string no vacío.
  const datavalidation = z.object({
    sesionId: z.string().min(1),
  });

  const validationResult = datavalidation.safeParse({
    sesionId,
  });

  if (!validationResult.success) {
    console.error(
      pc.yellow(
        `Error al finalizar sesión: ${pc.red(validationResult.error.toString())}`,
      ),
    );
    return null;
  }

  const sessionId = validationResult.data.sesionId;

  // 1. Verificar la existencia de la sesión en la base de datos.
  const sessionExists = await sesion.findById(sessionId).select('_id state');

  if (!sessionExists) {
    console.log(pc.yellow(`Error: Sesión con ID ${sessionId} no encontrada.`));
    return null;
  }

  // 2. Actualiza el estado de la sesión a 'F' (finalizado).
  const updatedSesion = await sesion.findByIdAndUpdate(
    sessionId, // Usamos sessionId ya parseado y verificado
    { state: "F" }, // Establece el estado como Finalizado
    { new: true },
  );

  return updatedSesion;
}
