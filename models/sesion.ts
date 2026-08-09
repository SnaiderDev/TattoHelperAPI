import mongoose from 'mongoose'
//state p-Pending | f-finished | c-canceled
const sesionSChema = new mongoose.Schema({
    date: {type: String, required:true},
    state: {type: String, required: true},
    commissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commissions",
        required:true
    }
});

export default mongoose.model('sesion', sesionSChema);