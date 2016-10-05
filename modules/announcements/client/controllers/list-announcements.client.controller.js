(function () {
  'use strict';

  angular
    .module('announcements')
    .controller('AnnouncementsListController', AnnouncementsListController);

  AnnouncementsListController.$inject = ['AnnouncementsService'];

  function AnnouncementsListController(AnnouncementsService) {
    var vm = this;

    vm.announcements = AnnouncementsService.query();
  }
}());
