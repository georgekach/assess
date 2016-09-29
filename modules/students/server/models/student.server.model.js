'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Student Schema
 */
var StudentSchema = new Schema({
name: {
    type: String,
    default: '',
    trim: true
  },
  surname: {
    type: String,
    default: '',
    trim: true
  },
  homeaddress: {
    type: String,
    default: '',
    trim: true
  },
  picture: {
    type: String,
    default: '',
    trim: true
  },
  studentnumber: {
    type: String,
    default: '',
    trim: true
  },
  gender: {
    type: String,
    default: '',
    trim: true
  },
      currentclass:{
        type: Schema.ObjectId, 
        ref: 'Schoolclass'   
      },
      currentclassname:{
          type: String,
          default:'',
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

mongoose.model('Student', StudentSchema);
