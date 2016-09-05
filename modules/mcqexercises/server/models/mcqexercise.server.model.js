'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Mcqexercise Schema
 */
var McqexerciseSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Mcqexercise name',
    trim: true
  },
  subject: {
    type: String,
    default: '',
    trim: true
  },
  studentlevel: {
    type: String,
    default: '',
    trim: true
  },
  questions: [{
    questionnumber:{
      type: Number,
        default:0
    },
    questiontext:{
      type: String,
        default:'',
        trim: true
    },
    possibleanswers:[{
      choiceletter: {
          type: String,
          default:'',
          trim: true
      },
        answertext:{
            type: String,
            default:'',
            trim: true
        }
    }],
    answers:{
      type: String,
      default: '',
      required: 'Please fill Mcqexercise name',
      trim: true 
    }   
  }],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Mcqexercise', McqexerciseSchema);
