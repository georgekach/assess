//Schoolclasses service used to communicate Schoolclasses REST endpoints
(function () {
  'use strict';

  angular
    .module('schoolclasses')
    .factory('SchoolclassesService', SchoolclassesService);

  SchoolclassesService.$inject = ['$resource'];

  function SchoolclassesService($resource) {
    return $resource('api/schoolclasses/:schoolclassId', {
      schoolclassId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
