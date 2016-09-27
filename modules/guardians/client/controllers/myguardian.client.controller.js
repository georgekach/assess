(function () {
  'use strict';

  angular
    .module('guardians')
    .controller('MyGuardianController', MyGuardianController);

  MyGuardianController.$inject = ['GuardiansService','Authentication'];

  function MyGuardianController(GuardiansService,Authentication) {
    var vm = this;

    var guardianPromise = GuardiansService.get({guardianId: Authentication.user.guardian}).$promise;
      
      vm.wards = [{name:'George',school:'Little Rock', grade:'Form 4',gender :'Male'},{name:'Tanatswa',school:'Olive Tree School', grade:'Grade 7',gender :'Female'}];
      
      guardianPromise.then(function(g){
          vm.guardian = g;
      });
  }
})();