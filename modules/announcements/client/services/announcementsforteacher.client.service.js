// Announcements service used to communicate Announcements REST endpoints
(function () {
  'use strict';

  angular
    .module('announcements')
    .factory('AnnouncementsForTeacherService', AnnouncementsForTeacherService);

  AnnouncementsForTeacherService.$inject = ['$resource'];

  function AnnouncementsForTeacherService($resource) {
    return $resource('api/announcementsforteacher/:origionatorId', {
      origionatorId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
        query:{
        method: 'GET',
        isArray: true
        }
    }
    );
  }
}());
