'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Student Schema
 */
var StudentSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Student name',
    trim: true
  },
  surname: {
    type: String,
    default: '',
    required: 'Please fill Student surname',
    trim: true
  },
  homeaddress: {
    type: String,
    default: '',
    required: 'Please fill Student name',
    trim: true
  },
  picture: {
    type: String,
    default: '',
    required: 'Please fill Student name',
    trim: true
  },
  studentnumber: {
    type: String,
    default: '',
    required: 'Please fill Student name',
    trim: true
  },
  gender: {
    type: String,
    default: '',
    required: 'Please fill Student name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Student', StudentSchema);
