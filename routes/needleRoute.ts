import express from "express";
import pc from "picocolors";
import {
  getAllNeedleTypes,
  getNeedleDetails,
} from "../controllers/needleControllers.js";

const router = express.Router();

 
//obtener todos los tipos de agujas
router.get("/", async (req, res) => {
  try {
    const data = await getAllNeedleTypes();
    res.status(202);
    res.json(data);
  } catch (error) {
    res.status(404);
    console.error(pc.yellow(`This is not possible!!! ${error}`));
  }
});

// Ruta para obtener detalles de un shortname específico.
router.get("/details", async (req, res) => {
  try {
    const shortnameValue = req.query.shortname;
    const shortname = typeof shortnameValue === "string" ? shortnameValue : undefined;

    if (!shortname) {
      return res.status(400).json({ message: "shortname query is required" });
    }

    const data = await getNeedleDetails(shortname);
    return res.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(404);
    console.error(pc.yellow(`This is not possible!!! ${message}`));
  }
});

export default router;
