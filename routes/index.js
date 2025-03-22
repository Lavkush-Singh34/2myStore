// routes/index.js
import express from 'express';
import productRoutes from './products.js';
import userRoutes from './users.js';
import orderRoutes from './orders.js';

const router = express.Router();

// Mount the different routers
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

export default router;