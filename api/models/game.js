const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  year: { type: Number, min: 1900, max: 2100 },
  stock: {
    type: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true, min: 0 },
      },
    ],
    minlength: 1,
    required: true,
  },
  image: String,
  description: String,
  brand: String,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
