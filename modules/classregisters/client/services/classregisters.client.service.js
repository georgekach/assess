//Classregisters service used to communicate Classregisters REST endpoints
(function () {
  'use strict';

  angular
    .module('classregisters')
    .factory('ClassregistersService', ClassregistersService);

  ClassregistersService.$inject = ['$resource'];

  function ClassregistersService($resource) {
    return $resource('api/classregisters/:classregisterId', {
      classregisterId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
