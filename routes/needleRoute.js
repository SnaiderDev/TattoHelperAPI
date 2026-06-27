import express from "express";
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
    const { shortname } = req.query;
    const data = await getNeedleDetails(shortname);
    res.json(data);
  } catch (error) {
    res.status(404);
    console.error(pc.yellow(`This is not possible!!! ${error}`));
  }
});

export default router;
