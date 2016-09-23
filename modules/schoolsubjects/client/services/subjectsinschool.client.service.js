// Schoolsubjects service used to communicate Schoolsubjects REST endpoints
(function () {
  'use strict';

  angular
    .module('schoolsubjects')
    .factory('SubjectsInSchoolService', SubjectsInSchoolService);

  SubjectsInSchoolService.$inject = ['$resource'];

  function SubjectsInSchoolService($resource) {
    return $resource('api/subjectsinschool/:subjectsSchoolId', {
      schoolsubjectId: '@_id'
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
}());
