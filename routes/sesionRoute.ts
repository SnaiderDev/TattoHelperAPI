import express from 'express'
import pc from 'picocolors'
import { getSesions, nextSesion } from '../controllers/sesionControllers.ts'

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

router.get('/nearest/:userId', async(req, res) => {
  try {
    // nextSesion finds the nearest session based on active commissions for a given user ID
    const sessions = await nextSesion(req.params.userId);

    if (!sessions) {
      return res.status(200).json({ message: "No upcoming or current session found." });
    }

    // Assuming the success status code should be 200 OK, as we are retrieving data, not creating it.
    res.status(200).json(sessions);
  } catch (error) {
    console.error(pc.red(`Error finding next session: ${String(error)}`));
    res.status(401).json({ message: "Could not find the next session." });
  }
});