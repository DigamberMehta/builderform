// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   amount: { type: Number, required: true },
//   method: { type: String, required: true }, // e.g., 'credit_card', 'netbanking', 'upi', 'cod'
//   status: { type: String, default: 'pending' }, // 'pending', 'completed', 'failed'
//   transactionId: { type: String }, // For storing transaction reference from payment gateway
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Payment', paymentSchema);
