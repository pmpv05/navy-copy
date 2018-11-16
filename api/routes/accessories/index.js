const handlers = require('./handlers');
const validators = require('./validators');
const authorization = require('../../middlewares/authorization');

module.exports = router => {
  router.post(
    '/accessories',
    authorization,
    validators.create,
    handlers.create,
  );
  router.get('/accessories', validators.find, handlers.find);
  router.get('/accessories/:id', validators.findOne, handlers.findOne);
  router.delete(
    '/accessories/:id',
    authorization,
    validators.uncreate,
    handlers.uncreate,
  );
  router.patch(
    '/accessories/:id',
    authorization,
    validators.update,
    handlers.update,
  );
  return router;
};
