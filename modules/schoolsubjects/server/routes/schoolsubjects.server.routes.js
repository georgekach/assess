'use strict';

/**
 * Module dependencies
 */
var schoolsubjectsPolicy = require('../policies/schoolsubjects.server.policy'),
  schoolsubjects = require('../controllers/schoolsubjects.server.controller');

module.exports = function(app) {
  // Schoolsubjects Routes
  app.route('/api/schoolsubjects').all(schoolsubjectsPolicy.isAllowed)
    .get(schoolsubjects.list)
    .post(schoolsubjects.create);

  app.route('/api/schoolsubjects/:schoolsubjectId').all(schoolsubjectsPolicy.isAllowed)
    .get(schoolsubjects.read)
    .put(schoolsubjects.update)
    .delete(schoolsubjects.delete);
    
    app.route('/api/subjectsinschool/:subjectsSchoolId').all(schoolsubjectsPolicy.isAllowed)
    .get(schoolsubjects.schoolsubjectBySchoolID);
    
  // Finish by binding the Schoolsubject middleware
  app.param('schoolsubjectId', schoolsubjects.schoolsubjectByID);
  app.param('subjectsSchoolId',schoolsubjects.schoolsubjectBySchoolID);
};
