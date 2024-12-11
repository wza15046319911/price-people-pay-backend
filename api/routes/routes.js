import { Router } from 'express';
import carsRouter from './cars.js';
import authRouter from './auth.js';

const router = Router();

router.use(carsRouter);
router.use(authRouter);

export default Router().use('/', router);