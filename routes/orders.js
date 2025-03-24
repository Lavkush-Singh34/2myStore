// routes/orders.js
import express from 'express';
const router = express.Router();

// GET all orders
router.get('/', (req, res) => {
  res.json([
    { id: 1, userId: 1, products: [{ productId: 1, quantity: 2 }], total: 39.98, status: 'pending' },
    { id: 2, userId: 2, products: [{ productId: 2, quantity: 1 }], total: 29.99, status: 'shipped' },
  ]);
});

// GET single order
router.get('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  res.json({ 
    id: orderId, 
    userId: 1, 
    products: [{ productId: 1, quantity: 2 }], 
    total: 39.98, 
    status: 'pending' 
  });
});

// POST - create new order
router.post('/', (req, res) => {
  // Here you would save the order to a database
  res.status(201).json({ id: 3, ...req.body, status: 'pending' });
});

// PUT - update order status
router.put('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  res.json({ id: orderId, ...req.body, updated: true });
});

export default router;