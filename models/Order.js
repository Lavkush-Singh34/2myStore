// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  shippingAddress: { type: String, required: true }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;