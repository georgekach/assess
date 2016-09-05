'use strict';

/**
 * Module dependencies
 */
var schooltermsPolicy = require('../policies/schoolterms.server.policy'),
  schoolterms = require('../controllers/schoolterms.server.controller');

module.exports = function(app) {
  // Schoolterms Routes
  app.route('/api/schoolterms').all(schooltermsPolicy.isAllowed)
    .get(schoolterms.list)
    .post(schoolterms.create);

  app.route('/api/schoolterms/:schooltermId').all(schooltermsPolicy.isAllowed)
    .get(schoolterms.read)
    .put(schoolterms.update)
    .delete(schoolterms.delete);

  // Finish by binding the Schoolterm middleware
  app.param('schooltermId', schoolterms.schooltermByID);
};
