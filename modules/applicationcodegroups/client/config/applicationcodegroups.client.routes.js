(function () {
  'use strict';

  angular
    .module('applicationcodegroups')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('applicationcodegroups', {
        abstract: true,
        url: '/applicationcodegroups',
        template: '<ui-view/>'
      })
      .state('applicationcodegroups.list', {
        url: '',
        templateUrl: 'modules/applicationcodegroups/client/views/list-applicationcodegroups.client.view.html',
        controller: 'ApplicationcodegroupsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Applicationcodegroups List'
        }
      })
      .state('applicationcodegroups.create', {
        url: '/create',
        templateUrl: 'modules/applicationcodegroups/client/views/form-applicationcodegroup.client.view.html',
        controller: 'ApplicationcodegroupsController',
        controllerAs: 'vm',
        resolve: {
          applicationcodegroupResolve: newApplicationcodegroup
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Applicationcodegroups Create'
        }
      })
      .state('applicationcodegroups.edit', {
        url: '/:applicationcodegroupId/edit',
        templateUrl: 'modules/applicationcodegroups/client/views/form-applicationcodegroup.client.view.html',
        controller: 'ApplicationcodegroupsController',
        controllerAs: 'vm',
        resolve: {
          applicationcodegroupResolve: getApplicationcodegroup
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Applicationcodegroup {{ applicationcodegroupResolve.name }}'
        }
      })
      .state('applicationcodegroups.view', {
        url: '/:applicationcodegroupId',
        templateUrl: 'modules/applicationcodegroups/client/views/view-applicationcodegroup.client.view.html',
        controller: 'ApplicationcodegroupsController',
        controllerAs: 'vm',
        resolve: {
          applicationcodegroupResolve: getApplicationcodegroup
        },
        data: {
          pageTitle: 'Applicationcodegroup {{ applicationcodegroupResolve.name }}'
        }
      });
  }

  getApplicationcodegroup.$inject = ['$stateParams', 'ApplicationcodegroupsService'];

  function getApplicationcodegroup($stateParams, ApplicationcodegroupsService) {
    return ApplicationcodegroupsService.get({
      applicationcodegroupId: $stateParams.applicationcodegroupId
    }).$promise;
  }

  newApplicationcodegroup.$inject = ['ApplicationcodegroupsService'];

  function newApplicationcodegroup(ApplicationcodegroupsService) {
    return new ApplicationcodegroupsService();
  }
}());
