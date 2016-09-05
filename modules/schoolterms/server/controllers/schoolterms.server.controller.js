'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Schoolterm = mongoose.model('Schoolterm'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Schoolterm
 */
exports.create = function(req, res) {
  var schoolterm = new Schoolterm(req.body);
  schoolterm.user = req.user;

  schoolterm.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolterm);
    }
  });
};

/**
 * Show the current Schoolterm
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var schoolterm = req.schoolterm ? req.schoolterm.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  schoolterm.isCurrentUserOwner = req.user && schoolterm.user && schoolterm.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(schoolterm);
};

/**
 * Update a Schoolterm
 */
exports.update = function(req, res) {
  var schoolterm = req.schoolterm ;

  schoolterm = _.extend(schoolterm , req.body);

  schoolterm.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolterm);
    }
  });
};

/**
 * Delete an Schoolterm
 */
exports.delete = function(req, res) {
  var schoolterm = req.schoolterm ;

  schoolterm.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolterm);
    }
  });
};

/**
 * List of Schoolterms
 */
exports.list = function(req, res) { 
  Schoolterm.find().sort('-created').populate('user', 'displayName').exec(function(err, schoolterms) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolterms);
    }
  });
};

/**
 * Schoolterm middleware
 */
exports.schooltermByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Schoolterm is invalid'
    });
  }

  Schoolterm.findById(id).populate('user', 'displayName').exec(function (err, schoolterm) {
    if (err) {
      return next(err);
    } else if (!schoolterm) {
      return res.status(404).send({
        message: 'No Schoolterm with that identifier has been found'
      });
    }
    req.schoolterm = schoolterm;
    next();
  });
};
