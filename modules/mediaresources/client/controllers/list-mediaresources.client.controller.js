(function () {
  'use strict';

  angular
    .module('mediaresources')
    .controller('MediaresourcesListController', MediaresourcesListController);

  MediaresourcesListController.$inject = ['MediaresourcesService'];

  function MediaresourcesListController(MediaresourcesService) {
    var vm = this;

    vm.mediaresources = MediaresourcesService.query();
  }
}());
