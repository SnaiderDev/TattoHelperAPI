import mongoose from "mongoose";

// states => P = Pending  | F = Finished |c = Canceled

const commissionSchema= new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    cellPhone: {type: String, required: false},
    state: {type:String, required:true},
    aproxSesions: {type:Number, required:true},
    value: {type:Number, required:true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

export default mongoose.model('commission', commissionSchema)
