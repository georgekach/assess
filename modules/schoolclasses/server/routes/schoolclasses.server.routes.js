'use strict';

/**
 * Module dependencies
 */
var schoolclassesPolicy = require('../policies/schoolclasses.server.policy'),
  schoolclasses = require('../controllers/schoolclasses.server.controller');

module.exports = function(app) {
  // Schoolclasses Routes
  app.route('/api/schoolclasses').all(schoolclassesPolicy.isAllowed)
    .get(schoolclasses.list)
    .post(schoolclasses.create);

  app.route('/api/schoolclasses/:schoolclassId').all(schoolclassesPolicy.isAllowed)
    .get(schoolclasses.read)
    .put(schoolclasses.update)
    .delete(schoolclasses.delete);

  // Finish by binding the Schoolclass middleware
  app.param('schoolclassId', schoolclasses.schoolclassByID);
};
