const handlers = require('./handlers');
const validators = require('./validators');
const authorization = require('../../middlewares/authorization');

module.exports = router => {
  router.get('/teapot', handlers.teapot);
  router.get('/users', validators.find, handlers.find);
  router.post('/users', validators.create, handlers.create);
  router.get('/users/:id', validators.findOne, handlers.findOne);
  router.delete(
    '/users/:id',
    authorization,
    validators.uncreate,
    handlers.uncreate,
  );
  router.post(
    '/users/:id/changePassword',
    authorization,
    validators.changePassword,
    handlers.changePassword,
  );
  router.post(
    '/users/forgotPassword',
    validators.forgotPassword,
    handlers.forgotPassword,
  );
  router.post(
    '/users/resetPassword',
    validators.resetPassword,
    handlers.resetPassword,
  );
  return router;
};
