(function () {
  'use strict';

  angular
    .module('schoolterms')
    .controller('SchooltermsListController', SchooltermsListController);

  SchooltermsListController.$inject = ['SchooltermsService'];

  function SchooltermsListController(SchooltermsService) {
    var vm = this;

    vm.schoolterms = SchooltermsService.query();
  }
})();
