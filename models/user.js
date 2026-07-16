import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema =  new mongoose.Schema({
    name: { type:String, required:true},
    email: { type:String, required:true},
    password: {type:String, required:true}
})


/*Antes de la  creacion de un nuevo usuario se realiza hash
de la contraseña para mayor seguridad
*/
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model('user', userSchema)