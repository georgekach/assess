//Schoolterms service used to communicate Schoolterms REST endpoints
(function () {
  'use strict';

  angular
    .module('schoolterms')
    .factory('SchooltermsService', SchooltermsService);

  SchooltermsService.$inject = ['$resource'];

  function SchooltermsService($resource) {
    return $resource('api/schoolterms/:schooltermId', {
      schooltermId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
