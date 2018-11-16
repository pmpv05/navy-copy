const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  stock: { type: Number, min: 0, required: true },
  console: { type: String, required: true },
  description: String,
  image: String,
  year: { type: Number, min: 1900, max: 2100 },
  brand: String,
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;
