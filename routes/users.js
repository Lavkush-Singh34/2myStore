// routes/users.js
import express from 'express';
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
  ]);
});

// GET single user
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  res.json({ id: userId, name: `User ${userId}`, email: `user${userId}@example.com` });
});

// Basic routes for user registration, login, etc.
router.post('/register', (req, res) => {
  res.status(201).json({ message: 'User registered successfully', user: req.body });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login successful', token: 'sample-jwt-token' });
});

export default router;