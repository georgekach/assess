(function () {
  'use strict';

  angular
    .module('schoolclasses')
    .controller('SchoolclassesListController', SchoolclassesListController);

  SchoolclassesListController.$inject = ['SchoolclassesService'];

  function SchoolclassesListController(SchoolclassesService) {
    var vm = this;

    vm.schoolclasses = SchoolclassesService.query();
  }
})();
