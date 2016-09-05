'use strict';

/**
 * Module dependencies
 */
var guardiansPolicy = require('../policies/guardians.server.policy'),
  guardians = require('../controllers/guardians.server.controller');

module.exports = function(app) {
  // Guardians Routes
  app.route('/api/guardians').all(guardiansPolicy.isAllowed)
    .get(guardians.list)
    .post(guardians.create);

  app.route('/api/guardians/:guardianId').all(guardiansPolicy.isAllowed)
    .get(guardians.read)
    .put(guardians.update)
    .delete(guardians.delete);

  // Finish by binding the Guardian middleware
  app.param('guardianId', guardians.guardianByID);
};
