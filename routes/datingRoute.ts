
import express from "express"
import pc from "picocolors"
import { createDating, nextDating,getDatingsByUser } from "../controllers/datingControllers.js"
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

router.get('/:userId', async (req, res) => {
  try {
    const data = await getDatingsByUser(req.params.userId)
    res.status(201).json({
      message: data
    })
  } catch (error) {
    console.error(pc.yellow("Error al obtener citas del usuario:"), error);
    res.status(404).json({
      message: 'This content is not available!!!'
    });
  }
});

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
    await createDating(name,email,sesions,timeAvg,unit,state,photo,value,userId)
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

router.get('/next/:userId', async (req, res) => {
  try {
    const nextDatingData = await nextDating(req.params.userId);
    if (!nextDatingData) {
        // El controlador ya maneja el log y devuelve null si no hay citas
        return res.status(404).json({ message: 'No se encontraron citas programadas para este usuario.' });
    }
    res.status(200).json(nextDatingData);
  } catch (error) {
    console.error("Error al obtener la próxima cita:", error);
    res.status(500).json({ message: 'Error interno al buscar citas.' });
  }
});

export default router;