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
    register:[{
        student: {
            type: Schema.ObjectId,
            ref: 'Student'
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
          }
    }],  
  schoolclass: {
    type: Schema.ObjectId,
    ref: 'Schoolclass'
  },
  dateofregister: {
    type: Date,
    default: Date.now
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
