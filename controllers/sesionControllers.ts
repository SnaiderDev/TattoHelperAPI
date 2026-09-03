import sesion from "../models/sesion.ts"
import z from "zod"
import pc from "picocolors"


//creacion de una sesion
export async function createSesion(initDate: Date, commissionId: string) {
    try {
        //validacion de los datos y praparacion de los datos en el modelo
        const sesionSchemaValidation = z.object({
            initDate: z.date(),
            commissionId: z.string().min(1)
        });

        const validationData = sesionSchemaValidation.safeParse({ initDate,commissionId })
        if (!validationData.success){
            console.log(pc.yellow('The data is invalid to create sessions'));
            return null;
        }
        const newsesion = new sesion({
            initDate: validationData.data.initDate,
            state: 'P',
            commissionId: validationData.data.commissionId
        });
        await newsesion.save();
        return newsesion;
    } catch (error:string | any) {
        console.error(pc.yellow("Error creating session: "+  error.toString()))
    }
}