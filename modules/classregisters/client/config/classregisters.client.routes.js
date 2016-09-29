(function () {
  'use strict';

  angular
    .module('classregisters')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('classregisters', {
        abstract: true,
        url: '/classregisters',
        template: '<ui-view/>'
      })
      .state('classregisters.list', {
        url: '',
        templateUrl: 'modules/classregisters/client/views/list-classregisters.client.view.html',
        controller: 'ClassregistersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Classregisters List'
        }
      })
      .state('classregisters.create', {
        url: '/create',
        templateUrl: 'modules/classregisters/client/views/form-classregister.client.view.html',
        controller: 'ClassregistersController',
        controllerAs: 'vm',
        resolve: {
          classregisterResolve: newClassregister
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Classregisters Create'
        }
      })
      .state('classregisters.edit', {
        url: '/:classregisterId/edit',
        templateUrl: 'modules/classregisters/client/views/form-classregister.client.view.html',
        controller: 'ClassregistersController',
        controllerAs: 'vm',
        resolve: {
          classregisterResolve: getClassregister
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Classregister {{ classregisterResolve.name }}'
        }
      })
      .state('classregisters.view', {
        url: '/:classregisterId',
        templateUrl: 'modules/classregisters/client/views/view-classregister.client.view.html',
        controller: 'ClassregistersController',
        controllerAs: 'vm',
        resolve: {
          classregisterResolve: getClassregister
        },
        data:{
          pageTitle: 'Classregister {{ articleResolve.name }}'
        }
      });
  }

  getClassregister.$inject = ['$stateParams', 'ClassregistersService'];

  function getClassregister($stateParams, ClassregistersService) {
    return ClassregistersService.get({
      classregisterId: $stateParams.classregisterId
    }).$promise;
  }

  newClassregister.$inject = ['ClassregistersService','$modalInstance'];

  function newClassregister(ClassregistersService,$modalInstance) {
    return new ClassregistersService();
  }
})();
