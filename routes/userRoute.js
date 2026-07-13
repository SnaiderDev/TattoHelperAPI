import express from 'express';
import pc from 'picocolors'

import { createUser, loginUser } from "../controllers/userControllers.js";

const router = express.Router();


//creacion de usuario 
router.post('/create', async(req,res)=>{
    try {
        const {name, email, password} = req.body
        await createUser(name, email, password)
        res.status(201).json({message: 'User created successfully'})
    } catch (error) {
        console.error(pc.yellow(`Errror creating user: ${pc.red(error)}`))
        res.status(400).json({message: 'Error creating user'})
    }
})

//logeo de usuario
router.post('/login', async(req,res) =>{
    const {email, password}  = req.body
    try {
        const token = await loginUser(email,password)
        if(!token){
            res.status(404).json({message: 'Invalid credentials'})
        } else {
            res.status(200).json({token})
        }
    } catch (error) {
        console.error(pc.yellow(`Error logging in user: ${pc.red(error)}`))
    }
})

export default router