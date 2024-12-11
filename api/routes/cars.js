import { Router } from 'express';
import { getCars } from '../services/cars.js';
const router = Router();

router.get('/car', async (req, res, next) => {
    try {
        const cars = await getCars(req.query);
        res.json(cars);
    } catch (error) {
        next(error);
    }
});

export default router;