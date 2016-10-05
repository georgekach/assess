'use strict';

/**
 * Module dependencies
 */
var announcementsPolicy = require('../policies/announcements.server.policy'),
  announcements = require('../controllers/announcements.server.controller');

module.exports = function(app) {
  // Announcements Routes
  app.route('/api/announcements').all(announcementsPolicy.isAllowed)
    .get(announcements.list)
    .post(announcements.create);

  app.route('/api/announcements/:announcementId').all(announcementsPolicy.isAllowed)
    .get(announcements.read)
    .put(announcements.update)
    .delete(announcements.delete);
    
  app.route('/api/announcementsforteacher/:origionatorId').all(announcementsPolicy.isAllowed)
   .get(announcements.announcementByTeacherID);
    
    
    

  // Finish by binding the Announcement middleware
  app.param('announcementId', announcements.announcementByID);
  app.param('origionatorId', announcements.announcementByTeacherID);
};
