const handlers = require('./handlers');
const validators = require('./validators');
const authorization = require('../../middlewares/authorization');

module.exports = router => {
  router.post('/games', authorization, validators.create, handlers.create);
  router.get('/games', validators.find, handlers.find);
  router.get('/games/:id', validators.findOne, handlers.findOne);
  router.delete(
    '/games/:id',
    authorization,
    validators.uncreate,
    handlers.uncreate,
  );
  router.patch('/games/:id', authorization, validators.update, handlers.update);
  return router;
};
