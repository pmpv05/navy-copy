const { celebrate, Joi } = require('celebrate');

const find = celebrate({ query: { limit: Joi.number() } });

const findOne = celebrate({ params: { id: Joi.string() } });

const create = celebrate({
  body: {
    name: Joi.string().required(),
    price: Joi.number()
      .integer()
      .min(0)
      .required(),
    year: Joi.number(),
    stock: Joi.array()
      .min(1)
      .required(),
    image: Joi.string(),
    description: Joi.string(),
    brand: Joi.string(),
  },
});

const uncreate = celebrate({ params: { id: Joi.string() } });

const update = celebrate({
  body: {
    name: Joi.string(),
    price: Joi.number()
      .integer()
      .min(0),
    year: Joi.number(),
    stock: Joi.array().min(1),
    image: Joi.string(),
    description: Joi.string(),
    brand: Joi.string(),
  },
});

module.exports = { find, findOne, create, uncreate, update };
