const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String, unique: true },
  name : {
    last : String,
    first : String
  },
  password: String
});

// Mongoose uses collection 'users' by default
const User = mongoose.model('User', userSchema);

// Export
module.exports = User;
