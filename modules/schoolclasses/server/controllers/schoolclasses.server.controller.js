'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Schoolclass = mongoose.model('Schoolclass'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Schoolclass
 */
exports.create = function(req, res) {
  var schoolclass = new Schoolclass(req.body);
  schoolclass.user = req.user;

  schoolclass.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolclass);
    }
  });
};

/**
 * Show the current Schoolclass
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var schoolclass = req.schoolclass ? req.schoolclass.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  schoolclass.isCurrentUserOwner = req.user && schoolclass.user && schoolclass.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(schoolclass);
};

/**
 * Update a Schoolclass
 */
exports.update = function(req, res) {
  var schoolclass = req.schoolclass ;

  schoolclass = _.extend(schoolclass , req.body);

  schoolclass.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolclass);
    }
  });
};

/**
 * Delete an Schoolclass
 */
exports.delete = function(req, res) {
  var schoolclass = req.schoolclass ;

  schoolclass.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolclass);
    }
  });
};

/**
 * List of Schoolclasses
 */
exports.list = function(req, res) { 
  Schoolclass.find().sort('-created').populate('user', 'displayName').exec(function(err, schoolclasses) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolclasses);
    }
  });
};

/**
 * Schoolclass middleware
 */
exports.schoolclassByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Schoolclass is invalid'
    });
  }

  Schoolclass.findById(id).populate('user', 'displayName').exec(function (err, schoolclass) {
    if (err) {
      return next(err);
    } else if (!schoolclass) {
      return res.status(404).send({
        message: 'No Schoolclass with that identifier has been found'
      });
    }
    req.schoolclass = schoolclass;
    next();
  });
};

exports.schoolclassBySchoolID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Schoolclass is invalid'
    });
  }
console.log(id);
  Schoolclass.find({school: id}).populate('user', 'displayName').populate('subjects.subject','name').populate('subjects.teacher','surname').exec(function (err, schoolclasses) {
    if (err) {
      return next(err);
    } else  {
      return  res.jsonp(schoolclasses);
    }
    /*req.schoolclass = schoolclass;
    next();*/
  });
};


exports.updateClassesTeacher = function (req, res, next, id){
    var subjectId = req.query.subjectId;
    var teacherId = req.query.teacherId;
    
    console.log('youve reached ...'+id);
    console.log('subjectId = '+subjectId);
    console.log('teacherId = '+teacherId);
    
    Schoolclass.findOneAndUpdate(
            { "_id": id, "subjects._id": subjectId },
            { 
                "$set": {
                    "subjects.$.teacher": teacherId
                }
            },
            function(err,doc) {
                
                if (err) {
                      return next(err);
                    } else  {
                      return  res.jsonp(doc);
                    }
                
            }
        );
};