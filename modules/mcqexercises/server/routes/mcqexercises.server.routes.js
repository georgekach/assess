'use strict';

/**
 * Module dependencies
 */
var mcqexercisesPolicy = require('../policies/mcqexercises.server.policy'),
  mcqexercises = require('../controllers/mcqexercises.server.controller');

module.exports = function(app) {
  // Mcqexercises Routes
  app.route('/api/mcqexercises').all(mcqexercisesPolicy.isAllowed)
    .get(mcqexercises.list)
    .post(mcqexercises.create);

  app.route('/api/mcqexercises/:mcqexerciseId').all(mcqexercisesPolicy.isAllowed)
    .get(mcqexercises.read)
    .put(mcqexercises.update)
    .delete(mcqexercises.delete);

  // Finish by binding the Mcqexercise middleware
  app.param('mcqexerciseId', mcqexercises.mcqexerciseByID);
};
