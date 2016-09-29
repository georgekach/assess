// Classexercises service used to communicate Classexercises REST endpoints
(function () {
  'use strict';

  angular
    .module('classexercises')
    .factory('ClassExercisesForClassService', ClassExercisesForClassService);

  ClassExercisesForClassService.$inject = ['$resource'];

  function ClassExercisesForClassService($resource) {
    return $resource('api/classexercisesforclass/:classExClassId', {
      classExClassId: '@_id'
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
