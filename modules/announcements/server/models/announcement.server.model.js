'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Announcement Schema
 */
var AnnouncementSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Announcement title',
    trim: true
  },
  originator:{ 
      type: Schema.ObjectId,
      ref: 'Teachers'
  },
    content: {
    type: String,
    default: '',
    trim: true
  },
    publishstartdate: {
    type: Date
  },
    publishenddate: {
    type: Date
  },
  broadcast: {
    
      btype:{
          type: String,
          default:''
      },
      bvalue:{
          type: String,
          default:''
      }
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

mongoose.model('Announcement', AnnouncementSchema);
