const mongoose = require('mongoose');

const consoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, min: 0, required: true },
  price: { type: Number, min: 0, required: true },
  image: String,
  year: { type: Number, min: 1900, max: 2100 },
  brand: String,
});

const Console = mongoose.model('Console', consoleSchema);

module.exports = Console;
