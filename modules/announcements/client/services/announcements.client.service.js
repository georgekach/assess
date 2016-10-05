// Announcements service used to communicate Announcements REST endpoints
(function () {
  'use strict';

  angular
    .module('announcements')
    .factory('AnnouncementsService', AnnouncementsService);

  AnnouncementsService.$inject = ['$resource'];

  function AnnouncementsService($resource) {
    return $resource('api/announcements/:announcementId', {
      announcementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
