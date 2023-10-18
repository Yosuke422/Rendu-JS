const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
})

// generate hashed password
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
}
);
// compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}



module.exports = mongoose.model('User', userSchema)
