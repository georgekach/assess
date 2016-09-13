(function () {
  'use strict';

  angular
    .module('applicationcodegroups')
    .controller('ApplicationcodegroupsListController', ApplicationcodegroupsListController);

  ApplicationcodegroupsListController.$inject = ['ApplicationcodegroupsService'];

  function ApplicationcodegroupsListController(ApplicationcodegroupsService) {
    var vm = this;

    vm.applicationcodegroups = ApplicationcodegroupsService.query();
  }
}());
