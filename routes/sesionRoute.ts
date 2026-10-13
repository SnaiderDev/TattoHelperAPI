import  express from "express"
import pc from "picocolors"
import { createSesion, getNextPendingSesion } from "../controllers/sesionControllers.ts"
import { tokenVerification } from "../controllers/userControllers.ts"

const router = express.Router()

let userId: string | null = null;
  
router.use(async (req, res, next) => {
  try {
    console.log(req.cookies);
    //req.cookies?.authToken
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({ message: "No token provided"});
    }
    const verificationResult = await tokenVerification(token)
    if(!verificationResult){
      return res.status(401).json({ message: "Token is invalid or expired" });
    }

    userId = typeof verificationResult === 'object' && verificationResult.userId ? verificationResult.userId : null;
    return next();
  } catch (error) {
    console.error(pc.yellow("Session is invalid or expired!"));
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
});

//crear nueva function
router.post('/create', async(req, res) => {
    try {
        const {initDate, commissionId} = req.body;
        const newSesion = await createSesion(initDate, commissionId);
        if(newSesion){
            res.status(201).json({ message: "Sesion creada exitosamente" })
        }
        else {
            res.status(400).json({ message: "The creation of the session failed" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating session" })
    }
})

//consultar la sesion mas cercana
router.get('/next', async(req, res) => {
  try {
    if (!userId){
      return res.status(403).json({ message: "User not authenticated"});
    }
    const nextSesion = await getNextPendingSesion(userId);
    if(nextSesion){
      res.status(200).json({ message: "Next pending session retrieved successfully", data: nextSesion })
    }
    else {
      res.status(404).json({ message: "No pending sessions found" })
    }
  } catch (error) {
    res.status(500).json({message: "Error getting next pending session"})
  }
})

export default router;