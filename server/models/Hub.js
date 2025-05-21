// import mongoose from 'mongoose'; // for ES6 import to maintain consistency with the rest of the code
// const {Schema} = mongoose;
// const logSchema = new Schema({
//   userId: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   firstName: {
//     type: String,
//     required: true,
//     trim: true
//   },

//   lastName: {
//     type: String,
//     required: true,
//     trim: true
//   },

//   emailId: {
//     type: String,
//     unique: true,
//     sparse: true,
//     lowercase: true,
//     trim: true
//   },
  
//   phone: {
//     type: String,
//     match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
//   }
// });

// const Log = mongoose.model('Log', logSchema);
// export default Log;
// export { logSchema };


import mongoose from 'mongoose';

const hubSchema = new mongoose.Schema({
  hubID: {
    type: String
  },
  hubName:{
    type: String
  },
  clientID:{
    type: String,
    required: true
  },
  clientSecret:{
    type: String
  },
  callbackURL:{
    type: String,
    required: true
  }
});

const Hub = mongoose.model('Hub', hubSchema);
export default Hub;
export { hubSchema };