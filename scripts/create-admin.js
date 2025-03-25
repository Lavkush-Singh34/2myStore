// scripts/create-admin.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true
    });
    
    await admin.save();
    console.log('Admin user created successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });