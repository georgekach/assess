'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Mcqexercise = mongoose.model('Mcqexercise'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Mcqexercise
 */
exports.create = function(req, res) {
  var mcqexercise = new Mcqexercise(req.body);
  mcqexercise.user = req.user;

  mcqexercise.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mcqexercise);
    }
  });
};

/**
 * Show the current Mcqexercise
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var mcqexercise = req.mcqexercise ? req.mcqexercise.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  mcqexercise.isCurrentUserOwner = req.user && mcqexercise.user && mcqexercise.user._id.toString() === req.user._id.toString();

  res.jsonp(mcqexercise);
};

/**
 * Update a Mcqexercise
 */
exports.update = function(req, res) {
  var mcqexercise = req.mcqexercise;

  mcqexercise = _.extend(mcqexercise, req.body);

  mcqexercise.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mcqexercise);
    }
  });
};

/**
 * Delete an Mcqexercise
 */
exports.delete = function(req, res) {
  var mcqexercise = req.mcqexercise;

  mcqexercise.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mcqexercise);
    }
  });
};

/**
 * List of Mcqexercises
 */
exports.list = function(req, res) {
  Mcqexercise.find().sort('-created').populate('user', 'displayName').exec(function(err, mcqexercises) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mcqexercises);
    }
  });
};

/**
 * Mcqexercise middleware
 */
exports.mcqexerciseByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mcqexercise is invalid'
    });
  }

  Mcqexercise.findById(id).populate('user', 'displayName').exec(function (err, mcqexercise) {
    if (err) {
      return next(err);
    } else if (!mcqexercise) {
      return res.status(404).send({
        message: 'No Mcqexercise with that identifier has been found'
      });
    }
    req.mcqexercise = mcqexercise;
    next();
  });
};
