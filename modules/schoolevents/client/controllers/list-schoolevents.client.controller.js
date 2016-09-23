(function () {
  'use strict';

  angular
    .module('schoolevents')
    .controller('SchooleventsListController', SchooleventsListController);

  SchooleventsListController.$inject = ['SchooleventsService'];

  function SchooleventsListController(SchooleventsService) {
    var vm = this;

    vm.schoolevents = SchooleventsService.query();
  }
}());
