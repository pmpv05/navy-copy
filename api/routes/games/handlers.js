const Game = require('../../models/game');

const find = (req, res) => {
  Game.find({}, (err, games) => {
    if (err) throw err;
    res.json(games);
  });
};

const findOne = (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    if (game !== undefined && game !== null) {
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  });
};

const create = (req, res) => {
  const { name, image, description, price, year, brand, stock } = req.body;
  const game = new Game({
    name,
    image,
    description,
    price,
    year,
    brand,
    stock,
  });
  game.save(err => {
    if (err) {
      res.sendStatus(400);
    }
    res.status(201).json(game);
  });
};

const uncreate = (req, res) => {
  Game.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
};

const update = (req, res) => {
  Game.update({ _id: req.params.id }, { $set: req.body }, err => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};
module.exports = { find, findOne, create, uncreate, update };
