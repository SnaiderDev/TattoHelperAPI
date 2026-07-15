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

//login
export async function loginUser(email, password){
        const userMatch = await user.findOne({email})
        if(!userMatch) return null

        const isMatch = await bcrypt.compare(password, userMatch.password)
        if(!isMatch) return null

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET must have a value')
        }

        const token = jwt.sign({id:userMatch._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        return token;
}