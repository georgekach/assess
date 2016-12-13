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
    
    app.route('/api/classesinschool/:schoolclassSchoolId').all(schoolclassesPolicy.isAllowed)
    .get(schoolclasses.read);
    
    app.route('/api/seteacherforclass/:sId').all(schoolclassesPolicy.isAllowed)
    .put(schoolclasses.updateClassesTeacher);

  // Finish by binding the Schoolclass middleware
  app.param('schoolclassId', schoolclasses.schoolclassByID);
  app.param('schoolclassSchoolId',schoolclasses.schoolclassBySchoolID);
  app.param('sId',schoolclasses.updateClassesTeacher);
};
