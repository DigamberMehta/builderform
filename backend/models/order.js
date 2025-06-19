// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   products: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//       quantity: { type: Number, required: true },
//       price: { type: Number, required: true }
//     }
//   ],
//   totalAmount: { type: Number, required: true },
//   status: { type: String, default: 'pending' },
//   shippingAddress: {
//     street: String,
//     city: String,
//     state: String,
//     zip: String,
//     country: String
//   },
//   paymentMethod: String,
//   paymentStatus: { type: String, default: 'unpaid' },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Order', orderSchema);
