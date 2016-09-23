'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Schoolsubject Schema
 */
var SchoolsubjectSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Schoolsubject name',
    trim: true
  },
    level:{
          type: String,
          default: '',
          trim: true
      },
    school: {
        type: Schema.ObjectId,
        ref: 'School'
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

mongoose.model('Schoolsubject', SchoolsubjectSchema);
