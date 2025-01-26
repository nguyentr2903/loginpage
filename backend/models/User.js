
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(this.password, salt);
      this.password = await bcrypt.hash(this.password, hash);
      next();
    } catch (err) {
      next(err);
    }
  });
  module.exports = mongoose.model('User', userSchema);