(function () {
  'use strict';

  angular
    .module('schoolsubjects')
    .controller('SchoolsubjectsListController', SchoolsubjectsListController);

  SchoolsubjectsListController.$inject = ['SchoolsubjectsService'];

  function SchoolsubjectsListController(SchoolsubjectsService) {
    var vm = this;

    vm.schoolsubjects = SchoolsubjectsService.query();
  }
}());
