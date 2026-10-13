import sesion from "../models/sesion.ts"
import z from "zod"
import pc from "picocolors"


//creacion de una sesion
export async function createSesion(commissionId: string, initDate: Date) {
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

//finalizar sesion
export async function finishSesion (sesionId: string){
    try {
        //comprobacion de sesionId valido
        const sesionIdSchema = z.string().max(1);
        const validadionData = sesionIdSchema.safeParse(sesionId);
        if (!validadionData.success) {
            console.log(pc.yellow('The session ID is invalid'));
            return null;
        }
        //actualizacion de registro y retorno de los datos actualizados
        const updateSesion = await sesion.findByIdAndUpdate(sesionId, { state: 'F', endDate: new Date() }, { new: true });
        return updateSesion;

    } catch (error:string | any) {
        console.error(pc.yellow("Error finishing session: " + error.toString()));
    }
}

//consultar sesion
export async function getSesionById(sesionId: string){
    try {
        //comprobacion de sesionId valido
        const sesionIdSchema = z.string().max(1);
        const validadionData = sesionIdSchema.safeParse(sesionId);
        if (!validadionData.success) {
            console.log(pc.yellow('The session ID is invalid'));
            return null;
        }
        //retorno de los datos de la sesion
        const sesionData = await sesion.findById(sesionId);
        return sesionData;
    } catch (error:string | any) {
        console.error(pc.yellow("Error finishing session: " + error.toString()));
    }
}

//Consultar  la sesion mas pendiente mas cercana
export async function getNextPendingSesion(userId: string){
    try {
      //validacion de la informacion
      const userIdSchema = z.string();
      const validationData = userIdSchema.safeParse(userId);
      if (!validationData.success){
        console.log(pc.yellow('The user ID is invalid'));
        return null;
      }
      //consulta de la sesion mas cercana
      const nextSesion = await sesion.findOne({ state: 'P', userId: validationData.data}).sort({ initDate: 1});
      return nextSesion;

    } catch (error:string | any) {
        console.error(pc.yellow("Error finishing session: " + error.toString()));
    }
}