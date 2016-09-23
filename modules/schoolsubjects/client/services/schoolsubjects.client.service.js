// Schoolsubjects service used to communicate Schoolsubjects REST endpoints
(function () {
  'use strict';

  angular
    .module('schoolsubjects')
    .factory('SchoolsubjectsService', SchoolsubjectsService);

  SchoolsubjectsService.$inject = ['$resource'];

  function SchoolsubjectsService($resource) {
    return $resource('api/schoolsubjects/:schoolsubjectId', {
      schoolsubjectId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
