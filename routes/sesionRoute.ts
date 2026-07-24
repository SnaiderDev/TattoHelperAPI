import express from 'express'
import { getSesions } from '../controllers/sesionControllers.ts'

const router = express.Router()

router.get('/', async(req,res)=>{
 try {
    const data = getSesions()
    res.status(201).json(data)
 } catch (error) {
    res.status(401).json({
        message: "This is not fine!"
    })
 }
});

export default router;