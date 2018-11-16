const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    passwordRecoveryCode: { type: String },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.comparePassword = async function(oldPassword, newPassword) {
  return bcrypt.compare(oldPassword, newPassword);
};

const hashPassword = async function(next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, saltRounds);
  return next();
};

userSchema.pre('save', hashPassword);

const User = mongoose.model('User', userSchema);

module.exports = User;
