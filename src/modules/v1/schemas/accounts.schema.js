import mongoose from 'mongoose';
import uuid from 'uuid/v1';

var Schema = mongoose.Schema;

//un nuevo schema accounts.js
mongoose.model('accounts', new Schema({
  _id: {
    type: String,
    default: () => { return uuid(); }
  },
  type: {
    type: Object,
    required: true
  },
  account_id: {
    type: String,
    required: true,
    default: () => { return uuid(); }
  },
}));