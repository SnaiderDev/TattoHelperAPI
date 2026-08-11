
import express from "express"
import pc from "picocolors"
import { createCommission } from "../controllers/commissionControllers.ts"
import jwt from 'jsonwebtoken'
import { tokenVerificaction } from "../controllers/userControllers.ts"


const router =express.Router()
//comprobacion de tokens
/*
router.use(async (req, res, next) => {
  try {
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    tokenVerificaction(token)
    return next();
  } catch (error) {
    console.error(pc.yellow("Sesion es invalid or expired!"));
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
});

*/



router.post('/create',async(req,res)=>{
    const {
    name,
    email,
    sesions,
    timeAvg,
    unit,
    state,
    photo,
    value,
    userId
  } = req.body

  try {
    await createCommission(name,email,sesions,timeAvg,unit,state,photo,value,userId)
    res.status(201).json({
         message: "Next commission is coming!"
    })
  } catch (error) {
    console.error(error)
    res.status(401).json({
        message:"Next commission is not possible!"
    })
  }
})

export default router;