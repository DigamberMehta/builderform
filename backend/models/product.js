// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   sellingPrice: { type: Number, required: true },
//   mrpPrice: { type: Number },
//   categories: [String], // Changed to an array of strings
//   brand: String,
//   stock: Number,
//   images: [String],
//   reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
//   rating: Number,
//   specifications: mongoose.Schema.Types.Mixed,
//   tags: [String],
//   additionalImages: [String],
//   slug: { type: String, required: true }, // Added slug field
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Product', productSchema);
