// Classexercises service used to communicate Classexercises REST endpoints
(function () {
  'use strict';

  angular
    .module('classexercises')
    .factory('ClassexercisesService', ClassexercisesService);

  ClassexercisesService.$inject = ['$resource'];

  function ClassexercisesService($resource) {
    return $resource('api/classexercises/:classexerciseId', {
      classexerciseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
