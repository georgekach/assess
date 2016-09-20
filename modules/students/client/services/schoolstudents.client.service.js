//Students service used to communicate Students REST endpoints
(function () {
  'use strict';

  angular
    .module('students')
    .factory('SchoolStudentsService', SchoolStudentsService);

  SchoolStudentsService.$inject = ['$resource'];

  function SchoolStudentsService($resource) {
    return $resource('api/studentsinschool/:selectedschoolId', {
      selectedschoolId: '@_id'
    }/*, {
      update: {
        method: 'PUT'
      }
    }*/);
  }
})();