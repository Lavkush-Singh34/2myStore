import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';  // Add this import
import routes from './routes/index.js';
import connectDB from './db/connection.js';
import expressLayouts from 'express-ejs-layouts';
import User from './models/User.js';

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_fallback_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,  // Use the MongoDB URI directly
    dbName: new URL(process.env.MONGODB_URI).pathname.substring(1), // Extract database name from URI
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));

// Rest of the server.js remains the same...
// User authentication middleware
app.use(async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId).select('-password');
      if (user) {
        req.user = user;
        res.locals.user = user;
      }
    } catch (error) {
      console.error('User retrieval error:', error);
    }
  }
  next();
});

// View engine setup
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API Routes
app.use('/api', routes);

// Frontend Routes
app.get('/', (req, res) => {
  res.render('index', { 
    user: req.user 
  });
});

app.get('/products', async (req, res) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/api/products`);
    const products = await response.json();
    res.render('products', { 
      products,
      user: req.user 
    });
  } catch (error) {
    res.status(500).render('error', { 
      message: error.message,
      user: req.user 
    });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/api/products/${req.params.id}`);
    const product = await response.json();
    res.render('product-detail', { 
      product,
      user: req.user 
    });
  } catch (error) {
    res.status(500).render('error', { 
      message: error.message,
      user: req.user 
    });
  }
});

// User authentication routes
app.get('/users/login', (req, res) => {
  res.render('users/login');
});

app.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

// Admin routes with authentication
const requireAdminAuth = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).render('error', { 
      message: 'Access denied',
      user: req.user 
    });
  }
  next();
};

app.get('/admin/login', (req, res) => {
  res.render('admin/login', { layout: false });
});

app.get('/admin/dashboard', requireAdminAuth, (req, res) => {
  res.render('admin/dashboard', { 
    layout: 'layouts/admin',
    user: req.user 
  });
});

app.get('/admin/products', requireAdminAuth, (req, res) => {
  res.render('admin/products', { 
    layout: 'layouts/admin',
    user: req.user 
  });
});

app.get('/admin/users', requireAdminAuth, (req, res) => {
  res.render('admin/users', { 
    layout: 'layouts/admin',
    user: req.user 
  });
});

app.get('/admin/orders', requireAdminAuth, (req, res) => {
  res.render('admin/orders', { 
    layout: 'layouts/admin',
    user: req.user 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;