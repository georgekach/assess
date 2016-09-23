'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Schoolevent Schema
 */
var SchooleventSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  startdate: {
    type: Date,
    trim: true
  },
  enddate: {
    type: Date,
    trim: true
  },
    publishstartdate: {
    type: Date,
    trim: true
  },
    publishenddate: {
    type: Date,
    trim: true
  },
    content: {
    type: String,
    default: '',
    trim: true
  }, 
  school:{
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

mongoose.model('Schoolevent', SchooleventSchema);
