(function () {
  'use strict';

  angular
    .module('schoolsubjects')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('schoolsubjects', {
        abstract: true,
        url: '/schoolsubjects',
        template: '<ui-view/>'
      })
      .state('schoolsubjects.list', {
        url: '',
        templateUrl: 'modules/schoolsubjects/client/views/list-schoolsubjects.client.view.html',
        controller: 'SchoolsubjectsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Schoolsubjects List'
        }
      })
      .state('schoolsubjects.create', {
        url: '/create',
        templateUrl: 'modules/schoolsubjects/client/views/form-schoolsubject.client.view.html',
        controller: 'SchoolsubjectsController',
        controllerAs: 'vm',
        resolve: {
          schoolsubjectResolve: newSchoolsubject
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Schoolsubjects Create'
        }
      })
      .state('schoolsubjects.edit', {
        url: '/:schoolsubjectId/edit',
        templateUrl: 'modules/schoolsubjects/client/views/form-schoolsubject.client.view.html',
        controller: 'SchoolsubjectsController',
        controllerAs: 'vm',
        resolve: {
          schoolsubjectResolve: getSchoolsubject
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Schoolsubject {{ schoolsubjectResolve.name }}'
        }
      })
      .state('schoolsubjects.view', {
        url: '/:schoolsubjectId',
        templateUrl: 'modules/schoolsubjects/client/views/view-schoolsubject.client.view.html',
        controller: 'SchoolsubjectsController',
        controllerAs: 'vm',
        resolve: {
          schoolsubjectResolve: getSchoolsubject
        },
        data: {
          pageTitle: 'Schoolsubject {{ schoolsubjectResolve.name }}'
        }
      });
  }

  getSchoolsubject.$inject = ['$stateParams', 'SchoolsubjectsService'];

  function getSchoolsubject($stateParams, SchoolsubjectsService) {
    return SchoolsubjectsService.get({
      schoolsubjectId: $stateParams.schoolsubjectId
    }).$promise;
  }

  newSchoolsubject.$inject = ['SchoolsubjectsService'];

  function newSchoolsubject(SchoolsubjectsService) {
    return new SchoolsubjectsService();
  }
}());
