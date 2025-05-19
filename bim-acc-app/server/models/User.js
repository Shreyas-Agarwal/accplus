const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  emailId: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },
  
  phone: {
    type: String,
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
  }
});

module.exports = mongoose.model('User', userSchema);
