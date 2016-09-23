//Teachers service used to communicate Teachers REST endpoints
(function () {
  'use strict';

  angular
    .module('teachers')
    .factory('TeachersInSchoolService', TeachersInSchoolService);

  TeachersInSchoolService.$inject = ['$resource'];

  function TeachersInSchoolService($resource) {
    return $resource('api/teachersinschool/:teachersSchoolId', {
      teachersSchoolId: '@_id'
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
