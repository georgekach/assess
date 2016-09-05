(function () {
  'use strict';

  angular
    .module('schoolclasses')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('schoolclasses', {
        abstract: true,
        url: '/schoolclasses',
        template: '<ui-view/>'
      })
      .state('schoolclasses.list', {
        url: '',
        templateUrl: 'modules/schoolclasses/client/views/list-schoolclasses.client.view.html',
        controller: 'SchoolclassesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Schoolclasses List'
        }
      })
      .state('schoolclasses.create', {
        url: '/create',
        templateUrl: 'modules/schoolclasses/client/views/form-schoolclass.client.view.html',
        controller: 'SchoolclassesController',
        controllerAs: 'vm',
        resolve: {
          schoolclassResolve: newSchoolclass
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Schoolclasses Create'
        }
      })
      .state('schoolclasses.edit', {
        url: '/:schoolclassId/edit',
        templateUrl: 'modules/schoolclasses/client/views/form-schoolclass.client.view.html',
        controller: 'SchoolclassesController',
        controllerAs: 'vm',
        resolve: {
          schoolclassResolve: getSchoolclass
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Schoolclass {{ schoolclassResolve.name }}'
        }
      })
      .state('schoolclasses.view', {
        url: '/:schoolclassId',
        templateUrl: 'modules/schoolclasses/client/views/view-schoolclass.client.view.html',
        controller: 'SchoolclassesController',
        controllerAs: 'vm',
        resolve: {
          schoolclassResolve: getSchoolclass
        },
        data:{
          pageTitle: 'Schoolclass {{ articleResolve.name }}'
        }
      });
  }

  getSchoolclass.$inject = ['$stateParams', 'SchoolclassesService'];

  function getSchoolclass($stateParams, SchoolclassesService) {
    return SchoolclassesService.get({
      schoolclassId: $stateParams.schoolclassId
    }).$promise;
  }

  newSchoolclass.$inject = ['SchoolclassesService'];

  function newSchoolclass(SchoolclassesService) {
    return new SchoolclassesService();
  }
})();
