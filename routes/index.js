// routes/index.js
import express from 'express';
import productRoutes from './products.js';
import userRoutes from './users.js';
import orderRoutes from './orders.js';
import adminRoutes from './admin.js';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);

export default router;