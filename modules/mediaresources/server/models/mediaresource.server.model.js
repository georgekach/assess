'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Mediaresource Schema
 */
var MediaresourceSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Media Resource Title',
    trim: true
  },
   attachment: {
    type: String,
    default: '',
    trim: true
  }, 
    caption: {
    type: String,
    default: '',
    trim: true
  },
    alttext: {
    type: String,
    default: '',
    trim: true
  },
    description: {
    type: String,
    default: '',
    trim: true
  },
    teacher: {
    type: Schema.ObjectId,
    ref: 'Teachers'
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

mongoose.model('Mediaresource', MediaresourceSchema);
