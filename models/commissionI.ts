import mongoose from "mongoose";

//state p-Pending | f-finished | c-canceled
//unit h-hours | m- minutes
const commissionISchema= new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    sesions: {type:Number, requiered:true},
    timeAvg: {type:Number, required:true},
    unit: {type:String, required:true},
    state: {type:String, required:true},
    photo: {type:String, required:false},
    value: {type:Number, required:true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

export default mongoose.model('commission', commissionISchema)