'use strict';

/**
 * Module dependencies
 */
var classexercisesPolicy = require('../policies/classexercises.server.policy'),
  classexercises = require('../controllers/classexercises.server.controller');

module.exports = function(app) {
  // Classexercises Routes
  app.route('/api/classexercises').all(classexercisesPolicy.isAllowed)
    .get(classexercises.list)
    .post(classexercises.create);

  app.route('/api/classexercises/:classexerciseId').all(classexercisesPolicy.isAllowed)
    .get(classexercises.read)
    .put(classexercises.update)
    .delete(classexercises.delete);

    app.route('/api/classexercisesforclass/:classExClassId').all(classexercisesPolicy.isAllowed)
    .get(classexercises.classexerciseBySchoolClassID);
    
  // Finish by binding the Classexercise middleware
  app.param('classexerciseId', classexercises.classexerciseByID);
  app.param('classExClassId',classexercises.classexerciseBySchoolClassID);
};
