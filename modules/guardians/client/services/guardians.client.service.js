//Guardians service used to communicate Guardians REST endpoints
(function () {
  'use strict';

  angular
    .module('guardians')
    .factory('GuardiansService', GuardiansService);

  GuardiansService.$inject = ['$resource'];

  function GuardiansService($resource) {
    return $resource('api/guardians/:guardianId', {
      guardianId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
