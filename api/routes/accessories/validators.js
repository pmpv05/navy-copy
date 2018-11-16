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
    stock: Joi.number()
      .integer()
      .min(0)
      .required(),
    console: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string(),
    year: Joi.number(),
    brand: Joi.string(),
  },
});

const uncreate = celebrate({ params: { id: Joi.string() } });

const update = celebrate({
  params: { id: Joi.string() },
  body: {
    name: Joi.string(),
    price: Joi.number()
      .integer()
      .min(0),
    stock: Joi.number()
      .integer()
      .min(0),
    console: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    year: Joi.number(),
    brand: Joi.string(),
  },
});

module.exports = { find, findOne, create, uncreate, update };
