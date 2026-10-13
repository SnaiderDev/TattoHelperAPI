import z from "zod";
import pc from "picocolors";
import commission from "../models/commission.ts";


/**
 * Crea una nueva comisión en la base de datos después de validar los datos con Zod.
 * @param name Nombre del servicio.
 * @param email Email de contacto.
 * @param cellPhone Teléfono celular.
 * @param state Estado inicial de la comisión.
 * @param photo URL o path de la foto.
 * @param value Valor monetario.
 * @param userId ID del usuario asociado a la comisión.
 * @returns Promise<Commission | null> La instancia de Comisión guardada o null si falla la validación.
 */
export async function createCommission (
  name: string, email:string, cellPhone:string, state:string, photo:string,
  value:number, userId:string
){
  const commissionSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cellPhone: z.string().optional(),
    state: z.string(),
    photo: z.string().optional(),
    value: z.number(),
    userId: z.string()
  })

  const validationResult = commissionSchema.safeParse({name, email,cellPhone, state,photo,value,userId
  })

  if(!validationResult.success){
    console.error(pc.yellow(`Error al crear comisión: ${pc.red(validationResult.error.toString())}`))
    return null
  }

  const data = {
    name: validationResult.data.name,
    email: validationResult.data.email,
    cellPhone: validationResult.data.cellPhone,
    state: validationResult.data.state,
    photo: validationResult.data.photo,
    value: validationResult.data.value,
    userId: validationResult.data.userId
  }

  const newCommission = new commission({
    name: data.name,
    email: data.email,
    cellPhone: data.cellPhone,
    state: data.state,
    photo: data.photo,
    value: data.value,
    userId: data.userId
  })
  return newCommission.save()
}