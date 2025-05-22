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