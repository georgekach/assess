'use strict';

/**
 * Module dependencies
 */
var schooleventsPolicy = require('../policies/schoolevents.server.policy'),
  schoolevents = require('../controllers/schoolevents.server.controller');

module.exports = function(app) {
  // Schoolevents Routes
  app.route('/api/schoolevents').all(schooleventsPolicy.isAllowed)
    .get(schoolevents.list)
    .post(schoolevents.create);

  app.route('/api/schoolevents/:schooleventId').all(schooleventsPolicy.isAllowed)
    .get(schoolevents.read)
    .put(schoolevents.update)
    .delete(schoolevents.delete);

  // Finish by binding the Schoolevent middleware
  app.param('schooleventId', schoolevents.schooleventByID);
};
