// const mongoose = require('mongoose');
import mongoose from 'mongoose'; // for ES6 import to maintain consistency with the rest of the code
const {Schema} = mongoose;

const companyUserSchema = new Schema({
  userID: {
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

  emailID: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },

  companyName: {
    type: String,
    required: true,
  },
  
  lastSignIn: {
    type: Date,
    default: Date.now,
  },

   role: {
    type: String,
    default: 'user',
  },

  phone: {
    type: String,
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
  }
});

const CompanyUser = mongoose.model('CompanyUser', companyUserSchema);
export default CompanyUser;
export { companyUserSchema };
