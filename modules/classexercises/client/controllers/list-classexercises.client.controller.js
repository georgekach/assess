(function () {
  'use strict';

  angular
    .module('classexercises')
    .controller('ClassexercisesListController', ClassexercisesListController);

  ClassexercisesListController.$inject = ['ClassexercisesService'];

  function ClassexercisesListController(ClassexercisesService) {
    var vm = this;

    vm.classexercises = ClassexercisesService.query();
  }
}());
