(function () {
  'use strict';

  angular
    .module('mcqexercises')
    .controller('McqexercisesListController', McqexercisesListController);

  McqexercisesListController.$inject = ['McqexercisesService'];

  function McqexercisesListController(McqexercisesService) {
    var vm = this;

    vm.mcqexercises = McqexercisesService.query();
  }
}());
