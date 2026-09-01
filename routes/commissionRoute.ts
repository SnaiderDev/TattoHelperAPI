
import express from "express"
import pc from "picocolors"
import { createCommission, getComnissionsByUserId } from "../controllers/commissionControllers.ts"
import jwt from 'jsonwebtoken'
import { tokenVerificaction } from "../controllers/userControllers.ts"

const router =express.Router()
//variable global para guardar el token de autenticacion
let authToken: string | null = null;

//comprobacion de JWT para tener el userid
router.use(async (req, res, next) => {
  try {
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({ message: "No token provided"});
    }
    tokenVerificaction(token)
    return next();
  } catch (error) {
    console.error(pc.yellow("Sesion es invalid or expired!"));
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
});

router.post('/commissions', async (req, res) => {
  const { userId } = req.body;
  const commissions = await getComnissionsByUserId(userId);
  res.json(commissions);
});


//creacion de comission
router.post('/create', async(req,res)=>{
  //extraccion de datos requeridos por el usuario
  const {name, email, cellPhone, aproxSesions, photo, value, userId} = req.body
  const newCommission = await createCommission(name, email, cellPhone, photo, aproxSesions, value, userId)
  if(newCommission){
    res.status(201).json({message: "Comision creada exitosamente"})
  }else{
    res.status(400).json({message: "Error al crear la comision"})
  }
})

//Obtener comisiones por usuario

export default router;

