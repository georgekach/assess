'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Mediaresource = mongoose.model('Mediaresource'),
  config = require(path.resolve('./config/config')),
  multer = require('multer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Mediaresource
 */
exports.create = function(req, res) {
  var mediaresource = new Mediaresource(req.body);
  mediaresource.user = req.user;

  mediaresource.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mediaresource);
    }
  });
};

/**
 * Show the current Mediaresource
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var mediaresource = req.mediaresource ? req.mediaresource.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  mediaresource.isCurrentUserOwner = req.user && mediaresource.user && mediaresource.user._id.toString() === req.user._id.toString();

  res.jsonp(mediaresource);
};

/**
 * Update a Mediaresource
 */
exports.update = function(req, res) {
  var mediaresource = req.mediaresource;

  mediaresource = _.extend(mediaresource, req.body);

  mediaresource.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mediaresource);
    }
  });
};

/**
 * Delete an Mediaresource
 */
exports.delete = function(req, res) {
  var mediaresource = req.mediaresource;

  mediaresource.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mediaresource);
    }
  });
};

/**
 * List of Mediaresources
 */
exports.list = function(req, res) {
  Mediaresource.find().sort('-created').populate('user', 'displayName').exec(function(err, mediaresources) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mediaresources);
    }
  });
};

/**
 * Mediaresource middleware
 */
exports.mediaresourceByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mediaresource is invalid'
    });
  }

  Mediaresource.findById(id).populate('user', 'displayName').exec(function (err, mediaresource) {
    if (err) {
      return next(err);
    } else if (!mediaresource) {
      return res.status(404).send({
        message: 'No Mediaresource with that identifier has been found'
      });
    }
    req.mediaresource = mediaresource;
    next();
  });
};


exports.mediaresourceByTeacherID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mediaresource is invalid'
    });
  }

  Mediaresource.find({teacher: id}).populate('user', 'displayName').exec(function (err, mediaresources) {
        if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mediaresources);
    }
  });
};

//upload resource as picture
exports.changeMediaResourcePicture = function (req, res) {
  var user = req.mediaresource;//req.user;
    console.log(user);
  var message = null;
  var upload = multer(config.uploads.profileUpload).single('newMediaResource');
  var resourcesUploadFileFilter = require(path.resolve('./config/lib/multer')).resourcesUploadFileFilter;
  
  // Filtering to upload only images
  upload.fileFilter = resourcesUploadFileFilter;

  if (user) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        user.attachment = config.uploads.mediaResourcesUpload.dest + req.file.filename;

        user.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            req.login(user, function (err) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};