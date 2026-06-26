import express from 'express';
import {getNeedleDetails}   from '../controllers/needleControllers.js';

const router = express.Router()


// Ruta para obtener detalles de un shortname específico.
router.get('/details', async (req, res) => {
    try {
        const { shortname } = req.query; 
        const data = await getNeedleDetails(shortname);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Algo salió mal' });
    }
});

export default router;
