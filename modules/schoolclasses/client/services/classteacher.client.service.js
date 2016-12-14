//Schoolclasses service used to communicate Schoolclasses REST endpoints
(function () {
  'use strict';

  angular
    .module('schoolclasses')
    .factory('ClassTeacherService', ClassTeacherService);

  ClassTeacherService.$inject = ['$resource'];

  function ClassTeacherService($resource) {
    return $resource('api/seteacherforclass', null, {
      update: {
        method: 'PUT',
          params: {
                subjectId: '@subjectId',
              teacherId:'@teacherId',
              classId:'@classId'
            }
      }
    });
  }
})();