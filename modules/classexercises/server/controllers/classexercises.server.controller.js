'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Classexercise = mongoose.model('Classexercise'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Classexercise
 */
exports.create = function(req, res) {
  var classexercise = new Classexercise(req.body);
  classexercise.user = req.user;

  classexercise.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(classexercise);
    }
  });
};

/**
 * Show the current Classexercise
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var classexercise = req.classexercise ? req.classexercise.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  classexercise.isCurrentUserOwner = req.user && classexercise.user && classexercise.user._id.toString() === req.user._id.toString();

  res.jsonp(classexercise);
};

/**
 * Update a Classexercise
 */
exports.update = function(req, res) {
  var classexercise = req.classexercise;

  classexercise = _.extend(classexercise, req.body);

  classexercise.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(classexercise);
    }
  });
};

/**
 * Delete an Classexercise
 */
exports.delete = function(req, res) {
  var classexercise = req.classexercise;

  classexercise.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(classexercise);
    }
  });
};

/**
 * List of Classexercises
 */
exports.list = function(req, res) {
  Classexercise.find().sort('-created').populate('user', 'displayName').exec(function(err, classexercises) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(classexercises);
    }
  });
};

/**
 * Classexercise middleware
 */
exports.classexerciseByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Classexercise is invalid'
    });
  }

  Classexercise.findById(id).populate('user', 'displayName').exec(function (err, classexercise) {
    if (err) {
      return next(err);
    } else if (!classexercise) {
      return res.status(404).send({
        message: 'No Classexercise with that identifier has been found'
      });
    }
    req.classexercise = classexercise;
    next();
  });
};


exports.classexerciseBySchoolClassID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Classexercise is invalid'
    });
  }

  Classexercise.find({classExClassId: id}).populate('user', 'displayName').exec(function (err, classexercises) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(classexercises);
    }
  });
};