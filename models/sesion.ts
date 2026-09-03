
import mongoose from "mongoose";

// STATES => P = Pending  | F = Finished | C = Canceled
const sesionSchema  = new mongoose.Schema({
    initDate: { type: Date,  required: true},
    endDate:  { type: Date, requires: true},
    state: { type: String, requires: true},
    commissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Commission', required: true }
})

export default mongoose.model('sesion', sesionSchema)