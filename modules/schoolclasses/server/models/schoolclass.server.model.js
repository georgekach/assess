'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Schoolclass Schema
 */
var SchoolclassSchema = new Schema({
  name: {
    type: String,
    default: '',
    /*required: 'Please fill Schoolclass name',*/
    trim: true
  },
  gradename: {
    type: String,
    default: '',
    /*required: 'Please fill the class Grade name',*/
    trim: true
  },
 subjects: [{
      subject:{
    type: Schema.ObjectId,
    ref: 'Schoolsubject'
      },
    teacher:{
        type: Schema.ObjectId,
    ref: 'Teacher'
    }
    
  }],
  year: {
    type: Number,
    /*required: 'Please fill the year for the class',*/
    trim: true
  },
  nextclass: {
    type: Schema.ObjectId,
    ref: 'Schoolclass',
    trim: true
  },
    school:{
      type: Schema.ObjectId,
      ref:'School'
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

mongoose.model('Schoolclass', SchoolclassSchema);
