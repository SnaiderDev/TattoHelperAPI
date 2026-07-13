import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import pc from 'picocolors'
import user from '../models/user.js'


//creacion de un usuario 
export async function createUser(name, email, password){
    try {
        const newUser = new user({name, email, password})
        await newUser.save()
    } catch (error) {
        console.error(pc.yellow(`Error creating user: ${error}`))
    }
}

//login
export async function loginUser(email, password){
    try {
        const userMatch =  await user.findOne({email})
        const isMatch = await bcrypt.compare(password, userMatch.password)
        if(!isMatch){
            throw new Error('Invalid credentials')
        }
        const token = jwt.sign({id:userMatch._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        return token;
    } catch (error) {
       console.error(pc.yellow(`Credential are not valid: ${pc.red(error)}`))
    }
}