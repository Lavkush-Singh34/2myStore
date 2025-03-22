// server.js
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());
// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Simple root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to myStore API' });
});

// Example product routes
app.get('/api/products', (req, res) => {
  // Here you would typically fetch products from a database
  const products = [
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
  ];
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  // Here you would typically fetch a specific product from a database
  const productId = parseInt(req.params.id);
  res.json({ id: productId, name: `Product ${productId}`, price: 19.99 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});