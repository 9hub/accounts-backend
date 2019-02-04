import mongoose from 'mongoose';
import uuid from 'uuid/v1';

var Schema = mongoose.Schema;

mongoose.model('Area', new Schema({
  _id: {
    type: String,
    default: () => { return uuid(); }
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  enabled: {
    type: Boolean,
    required: true
  },
  config: {
    type: Object,
    required: true
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true
  },
  users: {
    type: Array,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
}));
