'use strict';

/**
 * Module dependencies
 */
var applicationcodegroupsPolicy = require('../policies/applicationcodegroups.server.policy'),
  applicationcodegroups = require('../controllers/applicationcodegroups.server.controller');

module.exports = function(app) {
  // Applicationcodegroups Routes
  app.route('/api/applicationcodegroups').all(applicationcodegroupsPolicy.isAllowed)
    .get(applicationcodegroups.list)
    .post(applicationcodegroups.create);

  app.route('/api/applicationcodegroups/:applicationcodegroupId').all(applicationcodegroupsPolicy.isAllowed)
    .get(applicationcodegroups.read)
    .put(applicationcodegroups.update)
    .delete(applicationcodegroups.delete);

  // Finish by binding the Applicationcodegroup middleware
  app.param('applicationcodegroupId', applicationcodegroups.applicationcodegroupByID);
};
