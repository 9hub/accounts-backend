import mongoose from 'mongoose';
import uuid from 'uuid/v1';

let Schema = mongoose.Schema;

mongoose.model('Credential', new Schema({
  _id: {
    type: String,
    default: () => { return uuid(); }
  },
  type: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
  
}));
