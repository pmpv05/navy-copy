const User = require('../../models/user');
const sendEmail = require('../../utils/email');
const random = require('../../utils/random');

const find = (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw err;
    const filteredUsers = users.map(user => {
      const { _id, name, email, role, createdAt, updatedAt } = user;
      return { _id, name, email, role, createdAt, updatedAt };
    });
    res.json(filteredUsers);
  });
};

const findOne = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (user !== undefined && user !== null) {
      const { _id, name, email, role, createdAt, updatedAt } = user;
      res.json({ _id, name, email, role, createdAt, updatedAt });
    } else {
      res.sendStatus(404);
    }
  });
};

const create = (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({
    name,
    email,
    password,
    role,
  });
  user.save(err => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).json({ name, email });
    }
  });
};

const uncreate = (req, res) => {
  User.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(404);
    }
    res.sendStatus(200);
  });
};

const update = (req, res) => {
  User.update({ _id: req.params.id }, { $set: req.body }, err => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};

const changePassword = (req, res) => {
  User.findById(req.params.id, (err, u) => {
    if (u !== undefined && u !== null) {
      const user = u;
      user.password = req.body.newPassword;
      user.save(error => {
        if (error) {
          res.sendStatus(400);
        } else {
          res.json(user);
        }
      });
    }
  });
};

const forgotPassword = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.sendStatus(400);
    }
    if (user) {
      const code = random(99999);
      const codeStr = `${code}`.padStart(5, '0');
      sendEmail(
        {
          recipient: user.email,
          subject: 'Password Recovery',
          text: `Your password recovery code is:\n${codeStr}`,
        },
        error => {
          if (error) {
            res.sendStatus(500);
          }
          user.passwordRecoveryCode = codeStr;
          user.save();
          res.sendStatus(200);
        },
      );
    } else {
      res.sendStatus(400);
    }
  });
};

const resetPassword = (req, res) => {
  const { email, code, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.sendStatus(400);
    }
    if (user && code === user.passwordRecoveryCode) {
      user.password = password;
      user.passwordRecoveryCode = null;
      user.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  });
};

const teapot = (req, res) => res.sendStatus(418);

module.exports = {
  find,
  findOne,
  create,
  uncreate,
  update,
  changePassword,
  teapot,
  forgotPassword,
  resetPassword,
};
