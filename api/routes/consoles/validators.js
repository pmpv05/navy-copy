const { celebrate, Joi } = require('celebrate');

const find = celebrate({ query: { limit: Joi.number() } });

const findOne = celebrate({ params: { id: Joi.string() } });

const create = celebrate({
  body: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    stock: Joi.number()
      .integer()
      .min(0)
      .required(),
    price: Joi.number()
      .integer()
      .min(0)
      .required(),
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
    description: Joi.string(),
    stock: Joi.number()
      .integer()
      .min(0),
    price: Joi.number()
      .integer()
      .min(0),
    image: Joi.string(),
    year: Joi.number(),
    brand: Joi.string(),
  },
});

module.exports = { find, findOne, create, uncreate, update };
