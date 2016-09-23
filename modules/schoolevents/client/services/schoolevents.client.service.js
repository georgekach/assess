// Schoolevents service used to communicate Schoolevents REST endpoints
(function () {
  'use strict';

  angular
    .module('schoolevents')
    .factory('SchooleventsService', SchooleventsService);

  SchooleventsService.$inject = ['$resource'];

  function SchooleventsService($resource) {
    return $resource('api/schoolevents/:schooleventId', {
      schooleventId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
