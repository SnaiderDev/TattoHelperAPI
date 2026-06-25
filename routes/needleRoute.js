import express from 'express';
const router = express.Router();
import { getNeedleDetails } from '../controllers/needleController.js';

// Ruta para obtener detalles de un shortname específico.
router.get('/:shortname', async (req, res) => {
    try {
        const { shortname } = req.params; // Usamos `req.params` porque es `:shortname`
        const data = await getNeedleDetails(shortname);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Algo salió mal' });
    }
});

export default router;
