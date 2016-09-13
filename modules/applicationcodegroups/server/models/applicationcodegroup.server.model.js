'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Applicationcodegroup Schema
 */
var ApplicationCodeGroupSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Applicationcodegroup name',
    trim: true
  },
    applicationcodes:[{
        codeid:{
            type: String,
            trim: true,
            required: 'Please fill Application Code Id',
        },
        codename:{
            type: String,
            trim: true
        },
        codedescription:{
            type: String,
            trim: true
        }
    }],
    groupcode:{
        type: String,
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

mongoose.model('ApplicationCodeGroup', ApplicationCodeGroupSchema);
