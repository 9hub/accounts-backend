import mongoose from 'mongoose';
import uuid from 'uuid/v1';

let Schema = mongoose.Schema;

mongoose.model('Member', new Schema({
  _id: {
    type: String,
    default: () => { return uuid(); }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
}));
