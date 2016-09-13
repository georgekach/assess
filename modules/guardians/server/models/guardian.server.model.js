'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Guardian Schema
 */
var GuardianSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Guardian name',
    trim: true
  },
  surname: {
    type: String,
    default: '',
    required: 'Please fill Guardian surname',
    trim: true
  },
  email: {
    type: String,
    default: '',
    required: 'Please fill Guardian email',
    trim: true
  },
  phonenumber: {
    type: String,
    default: '',
    required: 'Please fill Guardian Phone number',
    trim: true
  },
    wards:[{
        type: Schema.ObjectId,
        ref: 'School'
    }],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Guardian', GuardianSchema);
