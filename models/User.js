// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Prevent model from being recompiled
const modelName = 'User';

// Check if model already exists
const User = mongoose.models[modelName] || mongoose.model(modelName, new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  isAdmin: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true }));

// Add password hashing middleware only if the model is newly created
if (!mongoose.models[modelName]) {
  User.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Hash the password along with the salt
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

  // Add a method to check password
  User.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
}

export default User;