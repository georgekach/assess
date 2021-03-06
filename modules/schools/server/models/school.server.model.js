'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * School Schema
 */
var SchoolSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill School name',
    trim: true
  },
  address: {
    type: String,
    default: '',
    required: 'Please fill School Address',
    trim: true
  },    
  schooltype: {
    type: String, 
    default: '',
    trim: true
  },
  logo: {
    type: String,
    default: '',
    required: 'Please fill logo url',
    trim: true
  },
    teachers:[{
       name: {
           type: String,
           default: ''
       } ,
        lastname:{
            type:String
        },
        classes:[{
            type: Schema.ObjectId,
            ref: 'School.schoolclasses'
        }]
    }],    
    schoolclasses:[{
        name: {
    type: String,
    default: '',   
    trim: true
  },
  gradename: {
    type: String,
    default: '',    
    trim: true
  },
  subjects: [{
      subject:{
    type: Schema.ObjectId,
    ref: 'School.subjects'
      },
    teacher:{
        type: Schema.ObjectId,
    ref: 'School.teachers'
    }
    
  }],
  year: {
    type: Number,    
    trim: true
  },
  nextclass: {
    type: Schema.ObjectId,
    ref: 'Schoolclass',
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
    }],
  students:[{
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
        ref: 'School.schoolclasses'   
      },
      currentclassname:{
          type: String,
          default:'',
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
  }],
  subjects:[{
      name:{
          type: String,
          default:'',
          trim: true
      },
      level:{
          type: String,
          default: '',
          trim: true
      }
      
  }],
    schoolevents:[{
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
  termsyear: {
    type: Number,
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

mongoose.model('School', SchoolSchema);
