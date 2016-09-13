(function () {
  'use strict';

  angular
    .module('guardians')
    .controller('MyGuardianController', MyGuardianController);

  MyGuardianController.$inject = ['GuardiansService','Authentication'];

  function MyGuardianController(GuardiansService,Authentication) {
    var vm = this;

    var guardianPromise = GuardiansService.get({guardianId: Authentication.user.guardian}).$promise;
      
      guardianPromise.then(function(g){
          vm.guardian = g;
      });
  }
})();