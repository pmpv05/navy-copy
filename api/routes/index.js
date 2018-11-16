const accessories = require('./accessories');
const consoles = require('./consoles');
const games = require('./games');
const users = require('./users');
const sessions = require('./sessions');

const resourceRoutes = [accessories, consoles, games, users, sessions];

module.exports = router => {
  resourceRoutes.forEach(routes => routes(router));
  return router;
};
