
import express from "express"
import pc from "picocolors"
import { createDating } from "../controllers/datingControllers.js"

const router =express.Router()

router.post('create',async(req,res)=>{
    const {
    name,
    email,
    sesion,
    timeAvg,
    unit,
    state,
    photo,
    value,
  } = req.body

  try {
    await createDating(name,email,sesion,timeAvg,unit,state,photo,value)
    res.status(201).json({
         message: "Next dating is coming!"
    })
  } catch (error) {
    console.error(error)
    res.status(401).json({
        message:"Next dating is not possible!"
    })
  }
})

export  default router;