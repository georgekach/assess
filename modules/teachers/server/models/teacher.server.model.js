'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Teacher Schema
 */
var TeacherSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Teacher name',
    trim: true
  },
  surname: {
    type: String,
    default: '',
    required: 'Please fill Teachers surname',
    trim: true
  },
  cellnumber: {
    type: String,
    default: '',
    required: 'Please fill Teachers cell number',
    trim: true
  },
  emailaddress: {
    type: String,
    default: '',
    required: 'Please fill Teachers Email',
    trim: true
  },
  title: {
    type: String,
    default: '',
    required: 'Please fill Teachers Title',
    trim: true
  },
  school: {
    type: Schema.ObjectId,
    ref: 'School',
    trim: true
  },
  reportsto: {
    type: Schema.ObjectId,
    ref: 'Teacher',
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

mongoose.model('Teacher', TeacherSchema);
