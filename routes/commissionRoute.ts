import express from "express"
import pc from "picocolors"
import { createCommission, getPendingCommissionsByUser } from "../controllers/commissionControllers.ts"
import { tokenVerification } from "../controllers/userControllers.ts"

const router = express.Router()

// Verificación de JWT para obtener el userId
let userId: string | null = null;
  
router.use(async (req, res, next) => {
  try {
    console.log(req.cookies);
    //req.cookies?.authToken
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTVhZDkyODFlMjg3ZDdkMWM3YTk1NDciLCJpYXQiOjE3ODgyNzM3MzMsImV4cCI6MTc4ODI3NzMzM30.7q3w0HbfEr-HDJ7bSRsYpjABPquz-kCwHisMkOUsMjM";
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

// Creación de comisión
router.post('/create', async(req, res) => {
  const { name, email, cellPhone, aproxSesions, photo, value } = req.body
  
  // Usar el userId verificado del middleware, no del req.body
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  
  const newCommission = await createCommission(name, email, cellPhone, aproxSesions, value, userId)
  if(newCommission) {
    res.status(201).json({ message: "Comisión creada exitosamente" })
  } else {
    res.status(400).json({ message: "Error al crear la comisión" })
  }
})

router.get('/pendingCommissions', async (req,res)=> {
  try {
    if (!userId){
      return res.status(403).json({ message: "User not authenticated"});
    }
    const pendingCommissions = await getPendingCommissionsByUser(userId)
    res.status(200).json(pendingCommissions)
  } catch (error) {
    res.status(400).json({ message: "Error al obtener comisiones pendientes" })
  }
})

export default router;

