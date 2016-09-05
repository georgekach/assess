'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Classregister Schema
 */
var ClassregisterSchema = new Schema({
  student: {
    type: Schema.ObjectId,
    ref: 'Student'
  },
  schoolclass: {
    type: Schema.ObjectId,
    ref: 'Schoolclass'
  },
  dateofregister: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: '',
    required: 'Please fill notes',
    trim: true
  },
  present: {
    type: Boolean,
    default: false
  },
  datemarked: {
    type: Date,
    default: Date.now
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

mongoose.model('Classregister', ClassregisterSchema);
