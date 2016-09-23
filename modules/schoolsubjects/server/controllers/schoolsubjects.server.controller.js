'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Schoolsubject = mongoose.model('Schoolsubject'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Schoolsubject
 */
exports.create = function(req, res) {
  var schoolsubject = new Schoolsubject(req.body);
  schoolsubject.user = req.user;

  schoolsubject.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolsubject);
    }
  });
};

/**
 * Show the current Schoolsubject
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var schoolsubject = req.schoolsubject ? req.schoolsubject.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  schoolsubject.isCurrentUserOwner = req.user && schoolsubject.user && schoolsubject.user._id.toString() === req.user._id.toString();

  res.jsonp(schoolsubject);
};

/**
 * Update a Schoolsubject
 */
exports.update = function(req, res) {
  var schoolsubject = req.schoolsubject;

  schoolsubject = _.extend(schoolsubject, req.body);

  schoolsubject.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolsubject);
    }
  });
};

/**
 * Delete an Schoolsubject
 */
exports.delete = function(req, res) {
  var schoolsubject = req.schoolsubject;

  schoolsubject.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolsubject);
    }
  });
};

/**
 * List of Schoolsubjects
 */
exports.list = function(req, res) {
  Schoolsubject.find().sort('-created').populate('user', 'displayName').exec(function(err, schoolsubjects) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolsubjects);
    }
  });
};

/**
 * Schoolsubject middleware
 */
exports.schoolsubjectByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Schoolsubject is invalid'
    });
  }

  Schoolsubject.findById(id).populate('user', 'displayName').exec(function (err, schoolsubject) {
    if (err) {
      return next(err);
    } else if (!schoolsubject) {
      return res.status(404).send({
        message: 'No Schoolsubject with that identifier has been found'
      });
    }
    req.schoolsubject = schoolsubject;
    next();
  });
};

exports.schoolsubjectBySchoolID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Schoolsubject is invalid'
    });
  }

  Schoolsubject.find({school:id}).populate('user', 'displayName').exec(function (err, schoolsubjects) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else{
      res.jsonp(schoolsubjects);
    }
    
  });
};