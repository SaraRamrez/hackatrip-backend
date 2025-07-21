import express from 'express';

import userRoutes from './userRoutes.js';
import tripRoutes from './tripRoutes.js';

const router = express.Router();

router.use(userRoutes);
router.use(tripRoutes);

export default router;
