import  express from "express"
import pc from "picocolors"
import { createSesion } from "../controllers/sesionControllers.ts"
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

export default router;