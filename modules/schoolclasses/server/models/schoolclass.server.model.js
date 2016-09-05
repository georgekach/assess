'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Schoolclass Schema
 */
var SchoolclassSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Schoolclass name',
    trim: true
  },
  gradename: {
    type: String,
    default: '',
    required: 'Please fill the class Grade name',
    trim: true
  },
  subject: {
    type: String,
    default: '',
    required: 'Please fill class subject name',
    trim: true
  },
  year: {
    type: Number,
    required: 'Please fill the year for the class',
    trim: true
  },
  school: {
    type: Schema.ObjectId,
    ref: 'School',
    trim: true
  },
  nextclass: {
    type: Schema.ObjectId,
    ref: 'Schoolclass',
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

mongoose.model('Schoolclass', SchoolclassSchema);
