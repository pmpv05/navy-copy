const { celebrate, Joi } = require('celebrate');

const password = () => Joi.string().min(6);

const email = () => Joi.string().email();

const find = celebrate({ query: { limit: Joi.number() } });

const findOne = celebrate({ params: { id: Joi.string() } });

const create = celebrate({
  body: {
    email: email().required(),
    name: Joi.string()
      .alphanum()
      .required(),
    password: password().required(),
    role: Joi.string()
      .alphanum()
      .required(),
  },
});

const uncreate = celebrate({
  params: { id: Joi.string() },
});

const update = celebrate({
  params: { id: Joi.string() },
  body: {
    email: email(),
    name: Joi.string().alphanum(),
  },
});

const changePassword = celebrate({
  params: { id: Joi.string() },
  body: {
    newPassword: password().required(),
  },
});

const forgotPassword = celebrate({
  body: {
    email: email().required(),
  },
});

const resetPassword = celebrate({
  body: {
    email: email().required(),
    code: Joi.string().required(),
    password: password().required(),
  },
});

module.exports = {
  find,
  findOne,
  create,
  uncreate,
  update,
  changePassword,
  forgotPassword,
  resetPassword,
};
