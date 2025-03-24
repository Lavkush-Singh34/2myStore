// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import connectDB from './db/connection.js';
import expressLayouts from 'express-ejs-layouts';

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API Routes
app.use('/api', routes);

// Frontend Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/products', async (req, res) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/api/products`);
    const products = await response.json();
    res.render('products', { products });
  } catch (error) {
    res.status(500).render('error', { message: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/api/products/${req.params.id}`);
    const product = await response.json();
    res.render('product-detail', { product });
  } catch (error) {
    res.status(500).render('error', { message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});