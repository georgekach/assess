//Schoolclasses service used to communicate Schoolclasses REST endpoints
(function () {
  'use strict';

  angular
    .module('schoolclasses')
    .factory('ClassesInSchoolService', SchoolclassesService);

  SchoolclassesService.$inject = ['$resource'];

  function SchoolclassesService($resource) {
    return $resource('api/classesinschool/:schoolclassSchoolId', {
      schoolclassId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
        query:{
            method: 'GET',
            isArray: true
        }
    });
  }
})();
