(function () {
  'use strict';

  angular
    .module('schoolevents')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('schoolevents', {
        abstract: true,
        url: '/schoolevents',
        template: '<ui-view/>'
      })
      .state('schoolevents.list', {
        url: '',
        templateUrl: 'modules/schoolevents/client/views/list-schoolevents.client.view.html',
        controller: 'SchooleventsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Schoolevents List'
        }
      })
      .state('schoolevents.create', {
        url: '/create',
        templateUrl: 'modules/schoolevents/client/views/form-schoolevent.client.view.html',
        controller: 'SchooleventsController',
        controllerAs: 'vm',
        resolve: {
          schooleventResolve: newSchoolevent
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Schoolevents Create'
        }
      })
      .state('schoolevents.edit', {
        url: '/:schooleventId/edit',
        templateUrl: 'modules/schoolevents/client/views/form-schoolevent.client.view.html',
        controller: 'SchooleventsController',
        controllerAs: 'vm',
        resolve: {
          schooleventResolve: getSchoolevent
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Schoolevent {{ schooleventResolve.name }}'
        }
      })
      .state('schoolevents.view', {
        url: '/:schooleventId',
        templateUrl: 'modules/schoolevents/client/views/view-schoolevent.client.view.html',
        controller: 'SchooleventsController',
        controllerAs: 'vm',
        resolve: {
          schooleventResolve: getSchoolevent
        },
        data: {
          pageTitle: 'Schoolevent {{ schooleventResolve.name }}'
        }
      });
  }

  getSchoolevent.$inject = ['$stateParams', 'SchooleventsService'];

  function getSchoolevent($stateParams, SchooleventsService) {
    return SchooleventsService.get({
      schooleventId: $stateParams.schooleventId
    }).$promise;
  }

  newSchoolevent.$inject = ['SchooleventsService'];

  function newSchoolevent(SchooleventsService) {
    return new SchooleventsService();
  }
}());
