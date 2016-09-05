'use strict';

/**
 * Module dependencies
 */
var classregistersPolicy = require('../policies/classregisters.server.policy'),
  classregisters = require('../controllers/classregisters.server.controller');

module.exports = function(app) {
  // Classregisters Routes
  app.route('/api/classregisters').all(classregistersPolicy.isAllowed)
    .get(classregisters.list)
    .post(classregisters.create);

  app.route('/api/classregisters/:classregisterId').all(classregistersPolicy.isAllowed)
    .get(classregisters.read)
    .put(classregisters.update)
    .delete(classregisters.delete);

  // Finish by binding the Classregister middleware
  app.param('classregisterId', classregisters.classregisterByID);
};
