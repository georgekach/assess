'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Applicationcodegroup = mongoose.model('ApplicationCodeGroup'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Applicationcodegroup
 */
exports.create = function(req, res) {
  var applicationcodegroup = new Applicationcodegroup(req.body);
  applicationcodegroup.user = req.user;

  applicationcodegroup.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(applicationcodegroup);
    }
  });
};

/**
 * Show the current Applicationcodegroup
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var applicationcodegroup = req.applicationcodegroup ? req.applicationcodegroup.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  applicationcodegroup.isCurrentUserOwner = req.user && applicationcodegroup.user && applicationcodegroup.user._id.toString() === req.user._id.toString();

  res.jsonp(applicationcodegroup);
};

/**
 * Update a Applicationcodegroup
 */
exports.update = function(req, res) {
  var applicationcodegroup = req.applicationcodegroup;

  applicationcodegroup = _.extend(applicationcodegroup, req.body);

  applicationcodegroup.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(applicationcodegroup);
    }
  });
};

/**
 * Delete an Applicationcodegroup
 */
exports.delete = function(req, res) {
  var applicationcodegroup = req.applicationcodegroup;

  applicationcodegroup.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(applicationcodegroup);
    }
  });
};

/**
 * List of Applicationcodegroups
 */
exports.list = function(req, res) {
  Applicationcodegroup.find().sort('-created').populate('user', 'displayName').exec(function(err, applicationcodegroups) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(applicationcodegroups);
    }
  });
};

/**
 * Applicationcodegroup middleware
 */
exports.applicationcodegroupByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Applicationcodegroup is invalid'
    });
  }

  Applicationcodegroup.findById(id).populate('user', 'displayName').exec(function (err, applicationcodegroup) {
    if (err) {
      return next(err);
    } else if (!applicationcodegroup) {
      return res.status(404).send({
        message: 'No Applicationcodegroup with that identifier has been found'
      });
    }
    req.applicationcodegroup = applicationcodegroup;
    next();
  });
};
