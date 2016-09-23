'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Schoolevent = mongoose.model('Schoolevent'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Schoolevent
 */
exports.create = function(req, res) {
  var schoolevent = new Schoolevent(req.body);
  schoolevent.user = req.user;

  schoolevent.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolevent);
    }
  });
};

/**
 * Show the current Schoolevent
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var schoolevent = req.schoolevent ? req.schoolevent.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  schoolevent.isCurrentUserOwner = req.user && schoolevent.user && schoolevent.user._id.toString() === req.user._id.toString();

  res.jsonp(schoolevent);
};

/**
 * Update a Schoolevent
 */
exports.update = function(req, res) {
  var schoolevent = req.schoolevent;

  schoolevent = _.extend(schoolevent, req.body);

  schoolevent.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolevent);
    }
  });
};

/**
 * Delete an Schoolevent
 */
exports.delete = function(req, res) {
  var schoolevent = req.schoolevent;

  schoolevent.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolevent);
    }
  });
};

/**
 * List of Schoolevents
 */
exports.list = function(req, res) {
  Schoolevent.find().sort('-created').populate('user', 'displayName').exec(function(err, schoolevents) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(schoolevents);
    }
  });
};

/**
 * Schoolevent middleware
 */
exports.schooleventByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Schoolevent is invalid'
    });
  }

  Schoolevent.findById(id).populate('user', 'displayName').exec(function (err, schoolevent) {
    if (err) {
      return next(err);
    } else if (!schoolevent) {
      return res.status(404).send({
        message: 'No Schoolevent with that identifier has been found'
      });
    }
    req.schoolevent = schoolevent;
    next();
  });
};
