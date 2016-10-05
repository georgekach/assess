(function () {
  'use strict';

  angular
    .module('announcements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('announcements', {
        abstract: true,
        url: '/announcements',
        template: '<ui-view/>'
      })
      .state('announcements.list', {
        url: '',
        templateUrl: 'modules/announcements/client/views/list-announcements.client.view.html',
        controller: 'AnnouncementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Announcements List'
        }
      })
      .state('announcements.create', {
        url: '/create',
        templateUrl: 'modules/announcements/client/views/form-announcement.client.view.html',
        controller: 'AnnouncementsController',
        controllerAs: 'vm',
        resolve: {
          announcementResolve: newAnnouncement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Announcements Create'
        }
      })
      .state('announcements.edit', {
        url: '/:announcementId/edit',
        templateUrl: 'modules/announcements/client/views/form-announcement.client.view.html',
        controller: 'AnnouncementsController',
        controllerAs: 'vm',
        resolve: {
          announcementResolve: getAnnouncement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Announcement {{ announcementResolve.name }}'
        }
      })
      .state('announcements.view', {
        url: '/:announcementId',
        templateUrl: 'modules/announcements/client/views/view-announcement.client.view.html',
        controller: 'AnnouncementsController',
        controllerAs: 'vm',
        resolve: {
          announcementResolve: getAnnouncement
        },
        data: {
          pageTitle: 'Announcement {{ announcementResolve.name }}'
        }
      });
  }

  getAnnouncement.$inject = ['$stateParams', 'AnnouncementsService'];

  function getAnnouncement($stateParams, AnnouncementsService) {
    return AnnouncementsService.get({
      announcementId: $stateParams.announcementId
    }).$promise;
  }

  newAnnouncement.$inject = ['AnnouncementsService'];

  function newAnnouncement(AnnouncementsService) {
    return new AnnouncementsService();
  }
}());
