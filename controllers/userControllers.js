import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import pc from 'picocolors'
import user from '../models/user.js'


//creacion de un usuario 
export async function createUser(name, email, password){
        const newUser = new user({name, email, password})
        return await newUser.save()
}

//Login y creacio de token de usuario 
export async function loginUser(email, password){
        const userMatch = await user.findOne({email})
        if(!userMatch) return null

        const isMatch = await bcrypt.compare(password, userMatch.password)
        if(!isMatch) return null

        if (!process.env.JWT_SECRET) {
           console.error(pc.yellow(`Warning ⚠️: JWT_SECRET is not defined`));
           return null;
        }
        //si se encuentra un usuario y la contraseña es correcta se crear el token de usuario con la dutracion parametrizada
        const token = jwt.sign({id:userMatch._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        return token;
}