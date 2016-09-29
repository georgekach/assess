//Classregisters service used to communicate Classregisters REST endpoints
(function () {
  'use strict';

  angular
    .module('classregisters')
    .factory('RegistersForClassService', RegistersForClassService);

  RegistersForClassService.$inject = ['$resource'];

  function RegistersForClassService($resource) {
    return $resource('api/registersforclass/:registerclassId', {
      classregisterId: '@_id'
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
