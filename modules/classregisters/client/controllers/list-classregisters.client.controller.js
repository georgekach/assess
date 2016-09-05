(function () {
  'use strict';

  angular
    .module('classregisters')
    .controller('ClassregistersListController', ClassregistersListController);

  ClassregistersListController.$inject = ['ClassregistersService'];

  function ClassregistersListController(ClassregistersService) {
    var vm = this;

    vm.classregisters = ClassregistersService.query();
  }
})();
