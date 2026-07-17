import express from 'express';
import pc from 'picocolors'

import { createUser, loginUser } from "../controllers/userControllers.js";

const router = express.Router();


//creacion de usuario 
router.post('/create', async(req,res)=>{
        console.log(pc.green(`Creating user with data: ${pc.blue(JSON.stringify(req.body))}`))
        const {name, email, password} = req.body
        const user = await createUser(name, email, password)
        if(user){
            res.status(201).json({message: 'User created successfully'})
        } else {
            res.status(400).json({message: 'Error creating user'})
        }

})

//logeo de usuario
router.post('/login', async(req,res) =>{
    const {email, password}  = req.body
    try {
        const token = await loginUser(email,password)
        if(!token){
            return res.status(404).json({message: 'Invalid credentials'})
        }
        console.log(pc.green(`This is fine!! user logged successfully ⚡ `))
        return res.status(200).json({token})
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(pc.yellow(`Error logging in user: ${pc.red(message)}`))
        return res.status(500).json({message: 'Error logging in user'})
    }
})

export default router