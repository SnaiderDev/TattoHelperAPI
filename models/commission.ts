import mongoose from "mongoose";

// states => P = Pending  | F = Finished |c = Canceled

// Schema definition para el modelo de Comisión (Commission)
const commissionSchema= new mongoose.Schema({

    name: {type:String, required:true}, // Nombre del servicio o comisión
    email: {type:String, required:true}, // Email asociado a la comisión
    cellPhone: {type: String, required: false}, // Teléfono celular de contacto
    state: {type:String, required:true}, // Estado actual de la comisión (P/F/C)
    photo: {type:String, required:false}, // URL o path de la foto asociada
    value: {type:Number, required:true}, // Valor monetario asociado a la comisión
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

export default mongoose.model('commission', commissionSchema)
