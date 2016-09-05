(function () {
  'use strict';

  angular
    .module('schoolterms')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('schoolterms', {
        abstract: true,
        url: '/schoolterms',
        template: '<ui-view/>'
      })
      .state('schoolterms.list', {
        url: '',
        templateUrl: 'modules/schoolterms/client/views/list-schoolterms.client.view.html',
        controller: 'SchooltermsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Schoolterms List'
        }
      })
      .state('schoolterms.create', {
        url: '/create',
        templateUrl: 'modules/schoolterms/client/views/form-schoolterm.client.view.html',
        controller: 'SchooltermsController',
        controllerAs: 'vm',
        resolve: {
          schooltermResolve: newSchoolterm
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Schoolterms Create'
        }
      })
      .state('schoolterms.edit', {
        url: '/:schooltermId/edit',
        templateUrl: 'modules/schoolterms/client/views/form-schoolterm.client.view.html',
        controller: 'SchooltermsController',
        controllerAs: 'vm',
        resolve: {
          schooltermResolve: getSchoolterm
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Schoolterm {{ schooltermResolve.name }}'
        }
      })
      .state('schoolterms.view', {
        url: '/:schooltermId',
        templateUrl: 'modules/schoolterms/client/views/view-schoolterm.client.view.html',
        controller: 'SchooltermsController',
        controllerAs: 'vm',
        resolve: {
          schooltermResolve: getSchoolterm
        },
        data:{
          pageTitle: 'Schoolterm {{ articleResolve.name }}'
        }
      });
  }

  getSchoolterm.$inject = ['$stateParams', 'SchooltermsService'];

  function getSchoolterm($stateParams, SchooltermsService) {
    return SchooltermsService.get({
      schooltermId: $stateParams.schooltermId
    }).$promise;
  }

  newSchoolterm.$inject = ['SchooltermsService'];

  function newSchoolterm(SchooltermsService) {
    return new SchooltermsService();
  }
})();
