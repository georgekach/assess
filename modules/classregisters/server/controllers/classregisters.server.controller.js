'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Classregister = mongoose.model('Classregister'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Classregister
 */
exports.create = function(req, res) {
  var classregister = new Classregister(req.body);
  classregister.user = req.user;

  classregister.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(classregister);
    }
  });
};

/**
 * Show the current Classregister
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var classregister = req.classregister ? req.classregister.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  classregister.isCurrentUserOwner = req.user && classregister.user && classregister.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(classregister);
};

/**
 * Update a Classregister
 */
exports.update = function(req, res) {
  var classregister = req.classregister ;

  classregister = _.extend(classregister , req.body);

  classregister.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(classregister);
    }
  });
};

/**
 * Delete an Classregister
 */
exports.delete = function(req, res) {
  var classregister = req.classregister ;

  classregister.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(classregister);
    }
  });
};

/**
 * List of Classregisters
 */
exports.list = function(req, res) { 
  Classregister.find().sort('-created').populate('user', 'displayName').exec(function(err, classregisters) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(classregisters);
    }
  });
};

/**
 * Classregister middleware
 */
exports.classregisterByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Classregister is invalid'
    });
  }

  Classregister.findById(id).populate('user', 'displayName').exec(function (err, classregister) {
    if (err) {
      return next(err);
    } else if (!classregister) {
      return res.status(404).send({
        message: 'No Classregister with that identifier has been found'
      });
    }
    req.classregister = classregister;
    next();
  });
};
