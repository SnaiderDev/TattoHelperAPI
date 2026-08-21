import mongoose from 'mongoose'
//state p-Pending | f-finished | c-canceled
const sesionSChema = new mongoose.Schema({
    initDate: {type: String, required:true},
    endDate: {type: String, requires: true},
    state: {type: String, required: true},
    commissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commissions",
        required:true
    }
});

export default mongoose.model('sesion', sesionSChema);