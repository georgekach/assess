'use strict';

/**
 * Module dependencies
 */
var mediaresourcesPolicy = require('../policies/mediaresources.server.policy'),
  mediaresources = require('../controllers/mediaresources.server.controller');

module.exports = function(app) {
  // Mediaresources Routes
  app.route('/api/mediaresources').all(mediaresourcesPolicy.isAllowed)
    .get(mediaresources.list)
    .post(mediaresources.create);

  app.route('/api/mediaresources/:mediaresourceId').all(mediaresourcesPolicy.isAllowed)
    .get(mediaresources.read)
    .put(mediaresources.update)
    .delete(mediaresources.delete);

    
  app.route('/api/mediarecourcesforteacher/:mendiaresourceTeacherId').all(mediaresourcesPolicy.isAllowed)
  .get(mediaresources.mediaresourceByTeacherID);

  // Finish by binding the Mediaresource middleware
  app.param('mediaresourceId', mediaresources.mediaresourceByID);
  app.param('mendiaresourceTeacherId', mediaresources.mediaresourceByTeacherID);
};
