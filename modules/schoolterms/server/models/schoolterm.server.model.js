'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Schoolterm Schema
 */
var SchooltermSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Schoolterm name',
    trim: true
  },
  startdate: {
    type: Date,
    required: 'Please fill Start Date',
    trim: true
  },
  enddate: {
    type: Date,
    required: 'Please fill the end date for the term',
    trim: true
  },
  termsyear: {
    type: Number,
    required: 'Please fill the year',
    trim: true
  },
  school: {
    type: Schema.ObjectId,
    ref: 'School',
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

mongoose.model('Schoolterm', SchooltermSchema);
