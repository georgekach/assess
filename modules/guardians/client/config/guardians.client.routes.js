(function () {
  'use strict';

  angular
    .module('guardians')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('guardians', {
        abstract: true,
        url: '/guardians',
        template: '<ui-view/>'
      })
      .state('guardians.list', {
        url: '',
        templateUrl: 'modules/guardians/client/views/list-guardians.client.view.html',
        controller: 'GuardiansListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Guardians List'
        }
      })
      .state('guardians.create', {
        url: '/create',
        templateUrl: 'modules/guardians/client/views/form-guardian.client.view.html',
        controller: 'GuardiansController',
        controllerAs: 'vm',
        resolve: {
          guardianResolve: newGuardian
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Guardians Create'
        }
      })
      .state('guardians.edit', {
        url: '/:guardianId/edit',
        templateUrl: 'modules/guardians/client/views/form-guardian.client.view.html',
        controller: 'GuardiansController',
        controllerAs: 'vm',
        resolve: {
          guardianResolve: getGuardian
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Guardian {{ guardianResolve.name }}'
        }
      })
      .state('guardians.view', {
        url: '/:guardianId',
        templateUrl: 'modules/guardians/client/views/view-guardian.client.view.html',
        controller: 'GuardiansController',
        controllerAs: 'vm',
        resolve: {
          guardianResolve: getGuardian
        },
        data:{
          pageTitle: 'Guardian {{ articleResolve.name }}'
        }
      });
  }

  getGuardian.$inject = ['$stateParams', 'GuardiansService'];

  function getGuardian($stateParams, GuardiansService) {
    return GuardiansService.get({
      guardianId: $stateParams.guardianId
    }).$promise;
  }

  newGuardian.$inject = ['GuardiansService'];

  function newGuardian(GuardiansService) {
    return new GuardiansService();
  }
})();
