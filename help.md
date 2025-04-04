```js
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
```
---
Now you can use your browser to access the following URLs:

Homepage: http://localhost:3000/
All products: http://localhost:3000/api/products
Single product: http://localhost:3000/api/products/1
All users: http://localhost:3000/api/users
Single user: http://localhost:3000/api/users/1
All orders: http://localhost:3000/api/orders
Single order: http://localhost:3000/api/orders/1



For routes that use POST, PUT, or DELETE methods (like creating a product, updating an order, etc.), you can't access them directly in the browser. For these, you'll need to use:

API testing tools like Postman or Insomnia
The Fetch API or AJAX calls from a frontend application
Command-line tools like curl

For example, to create a new product using curl:
Copycurl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Product","price":39.99,"category":"Electronics"}'
---
