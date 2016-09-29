'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Classexercise Schema
 */
var ClassexerciseSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true
  },
    marks:[{
        student: {
            type: Schema.ObjectId,
            ref: 'Student'
          },
        notes: {
            type: String,
            default: '',
            trim: true
          },
        mark: {
            type: Number,
            default: false
          }
    }],
    totalmark: {
            type: Number,
            default: false
          },
  schoolclass: {
    type: Schema.ObjectId,
    ref: 'Schoolclass'
  },
  dateofexercise: {
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

mongoose.model('Classexercise', ClassexerciseSchema);
