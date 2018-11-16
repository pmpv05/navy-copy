const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const find = (req, res) => {
  // Find email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.sendStatus(401).json({ error: 'Email or password incorrect' });
    }
    if (user) {
      user.comparePassword(req.body.password, user.password).then(result => {
        if (result) {
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            },
            'navy',
            { expiresIn: '2h' },
          );
          res.status(200).send(res.json({ token, message: 'Authenticated' }));
        } else {
          res.sendStatus(401).json({ error: 'Email or password incorrect' });
        }
      });
    } else {
      res.sendStatus(401).json({ error: 'Email or password incorrect' });
    }
  });
};

module.exports = {
  find,
};
