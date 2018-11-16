const Accessory = require('../../models/accessory');

const find = (req, res) => {
  Accessory.find({}, (err, accessories) => {
    if (err) throw err;
    res.json(accessories);
  });
};

const findOne = (req, res) => {
  const { id } = req.params;
  Accessory.findById(id, (err, accessory) => {
    if (accessory !== undefined && accessory !== null) {
      res.json(accessory);
    } else {
      res.sendStatus(404);
    }
  });
};

const create = (req, res) => {
  const {
    name,
    price,
    stock,
    console,
    description,
    image,
    year,
    brand,
  } = req.body;
  const accessory = new Accessory({
    name,
    price,
    stock,
    console,
    description,
    image,
    year,
    brand,
  });
  accessory.save(err => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).json(accessory);
    }
  });
};

const uncreate = (req, res) => {
  const { id } = req.params;
  Accessory.findByIdAndDelete(id, err => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
};

const update = (req, res) => {
  Accessory.update({ _id: req.params.id }, { $set: req.body }, err => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = { find, findOne, create, uncreate, update };
