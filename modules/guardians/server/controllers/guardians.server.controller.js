'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Guardian = mongoose.model('Guardian'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Guardian
 */
exports.create = function(req, res) {
  var guardian = new Guardian(req.body);
  guardian.user = req.user;

  guardian.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(guardian);
    }
  });
};

/**
 * Show the current Guardian
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var guardian = req.guardian ? req.guardian.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  guardian.isCurrentUserOwner = req.user && guardian.user && guardian.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(guardian);
};

/**
 * Update a Guardian
 */
exports.update = function(req, res) {
  var guardian = req.guardian ;

  guardian = _.extend(guardian , req.body);

  guardian.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(guardian);
    }
  });
};

/**
 * Delete an Guardian
 */
exports.delete = function(req, res) {
  var guardian = req.guardian ;

  guardian.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(guardian);
    }
  });
};

/**
 * List of Guardians
 */
exports.list = function(req, res) { 
  Guardian.find().sort('-created').populate('user', 'displayName').exec(function(err, guardians) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(guardians);
    }
  });
};

/**
 * Guardian middleware
 */
exports.guardianByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Guardian is invalid'
    });
  }

  Guardian.findById(id).populate('user', 'displayName').exec(function (err, guardian) {
    if (err) {
      return next(err);
    } else if (!guardian) {
      return res.status(404).send({
        message: 'No Guardian with that identifier has been found'
      });
    }
    req.guardian = guardian;
    next();
  });
};
