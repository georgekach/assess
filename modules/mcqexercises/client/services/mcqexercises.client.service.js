// Mcqexercises service used to communicate Mcqexercises REST endpoints
(function () {
  'use strict';

  angular
    .module('mcqexercises')
    .factory('McqexercisesService', McqexercisesService);

  McqexercisesService.$inject = ['$resource'];

  function McqexercisesService($resource) {
    return $resource('api/mcqexercises/:mcqexerciseId', {
      mcqexerciseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
