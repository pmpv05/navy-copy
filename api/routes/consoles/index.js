const handlers = require('./handlers');
const validators = require('./validators');
const authorization = require('../../middlewares/authorization');

module.exports = router => {
  router.post('/consoles', authorization, validators.create, handlers.create);
  router.get('/consoles', validators.find, handlers.find);
  router.get('/consoles/:id', validators.findOne, handlers.findOne);
  router.delete(
    '/consoles/:id',
    authorization,
    validators.uncreate,
    handlers.uncreate,
  );
  router.patch(
    '/consoles/:id',
    authorization,
    validators.update,
    handlers.update,
  );
  return router;
};
