const Console = require('../../models/console');

const find = (req, res) => {
  Console.find({}, (err, accessories) => {
    if (err) throw err;
    res.json(accessories);
  });
};

const findOne = (req, res) => {
  const { id } = req.params;
  Console.findById(id, (err, accessory) => {
    if (accessory !== undefined && accessory !== null) {
      res.json(accessory);
    } else {
      res.sendStatus(404);
    }
  });
};

const create = (req, res) => {
  const { name, description, image, year, price, brand, stock } = req.body;
  const console = new Console({
    name,
    description,
    image,
    year,
    price,
    brand,
    stock,
  });
  console.save(err => {
    if (err) {
      res.sendStatus(400);
    }
    res.status(201).json(console);
  });
};

const uncreate = (req, res) => {
  const { id } = req.params;
  Console.findByIdAndDelete(id, err => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
};

const update = (req, res) => {
  Console.update({ _id: req.params.id }, { $set: req.body }, err => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = { find, findOne, create, uncreate, update };
