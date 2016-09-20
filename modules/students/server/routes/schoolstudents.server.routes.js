'use strict';

/**
 * Module dependencies
 */
var studentsPolicy = require('../policies/schoolstudents.server.policy'),
  students = require('../controllers/students.server.controller');

module.exports = function(app) {
  // Students Routes
/*  app.route('/api/studentsinschool').all(studentsPolicy.isAllowed)
    .get(students.list);*/

  app.route('/api/studentsinschool/:selectedschoolId').all(studentsPolicy.isAllowed)
    .get(students.read);

  // Finish by binding the Student middleware
  app.param('selectedschoolId', students.studentsinschoolBySchoolID);
};
