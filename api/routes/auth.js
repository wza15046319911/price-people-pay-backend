import { Router } from 'express';
import { login } from '../services/auth.js';
const router = Router();

router.post('/login', async (req, res, next) => {
    try {
        const token = await login(req.body);
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

export default router;