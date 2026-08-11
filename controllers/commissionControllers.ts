import z from "zod";
import pc from "picocolors";
import commission from "../models/commission.ts";



/**
 * Creates a new commission record for user tracking.
 * @param name - Name of the professional.
 * @param email - Email address of the professional.
 * @param sesions - Number of sessions recorded.
 * @param timeAvg - Average time per session in minutes.
 * @param unit - Unit used for calculation (e.g., 'day', 'month').
 * @param state - State or region of service.
 * @param photo - Photo URL of the professional.
 * @param value - Monetary value associated with the commission.
 * @param userId - ID of the user who generated this commission record.
 */
export async function createCommission(
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

// Parse validation result using provided parameters
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
    console.error(pc.yellow(`Error al crear usuario: ${pc.red(validationResult.error.toString())}`));
    return null;
  }

  // If validation is successful, we safely use the validated data to create and save the commission record.
  const newCommission = new commission({
    name: validationResult.data.name,
    email: validationResult.data.email,
    sesions: validationResult.data.sesions,
    timeAvg: validationResult.data.timeAvg,
    unit: validationResult.data.unit,
    state: validationResult.data.state,
    photo: validationResult.data.photo,
    value: validationResult.data.value,
    userId: validationResult.data.userId
  });

  return await newCommission.save();
}
