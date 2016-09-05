(function () {
  'use strict';

  angular
    .module('guardians')
    .controller('GuardiansListController', GuardiansListController);

  GuardiansListController.$inject = ['GuardiansService'];

  function GuardiansListController(GuardiansService) {
    var vm = this;

    vm.guardians = GuardiansService.query();
  }
})();
