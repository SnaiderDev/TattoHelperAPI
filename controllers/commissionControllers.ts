import z from 'zod'
import pc from 'picocolors'
import commission from '../models/commission.ts'

//creacion de una una commision
export async function createCommission(name:string, email:string, cellPhone:string, photo:string, aproxSesions: number, value: number, userId:string){

  //validacion de datos de entrada
  const commissionSchemaValidation = z.object({
    name: z.string().min(1),
    email: z.string().email().transform((val) => val.toLowerCase()),
    cellPhone: z.string(),
    photo: z.string().optional(),
    aproxSesions: z.number().min(1),
    value: z.number().min(0),
    userId: z.string().min(1)
  })

  const validationData = commissionSchemaValidation.safeParse({ name, email, cellPhone, photo, aproxSesions,value, userId })
  if(!validationData.success){
   console.log(pc.yellow(`Error al crear la comision: ${pc.red(validationData.error.toString())}`))
   return null
  }
  // maqueracion del json completo del modelo
  const data = {
    name: validationData.data.name,
    email: validationData.data.email,
    cellPhone: validationData.data.cellPhone,
    state: 'P',
    photo: validationData.data.photo,
    aproxSesions: validationData.data.aproxSesions,
    value: validationData.data.value,
    userId: validationData.data.userId
  }

  return await commission.create(data)

}