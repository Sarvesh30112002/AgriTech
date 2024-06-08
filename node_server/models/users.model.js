const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    // trim: true,
    minlength: 1
  },
  name: {
    type: String,
    required: true,
  },
  
  coins: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});



const User = mongoose.model('User', userSchema);

module.exports = User;
