'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Schoolterm Schema
 */
var StudentGuardianSchema = new Schema({
  student: {
    type: Schema.ObjectId,
    ref: 'Student'
  },
  guardian: {
    type: Schema.ObjectId,
    ref: 'Guardian'
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

mongoose.model('StudentGuardian', StudentGuardianSchema);
