(function () {
  'use strict';

  angular
    .module('classexercises')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('classexercises', {
        abstract: true,
        url: '/classexercises',
        template: '<ui-view/>'
      })
      .state('classexercises.list', {
        url: '',
        templateUrl: 'modules/classexercises/client/views/list-classexercises.client.view.html',
        controller: 'ClassexercisesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Classexercises List'
        }
      })
      .state('classexercises.create', {
        url: '/create',
        templateUrl: 'modules/classexercises/client/views/form-classexercise.client.view.html',
        controller: 'ClassexercisesController',
        controllerAs: 'vm',
        resolve: {
          classexerciseResolve: newClassexercise
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Classexercises Create'
        }
      })
      .state('classexercises.edit', {
        url: '/:classexerciseId/edit',
        templateUrl: 'modules/classexercises/client/views/form-classexercise.client.view.html',
        controller: 'ClassexercisesController',
        controllerAs: 'vm',
        resolve: {
          classexerciseResolve: getClassexercise
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Classexercise {{ classexerciseResolve.name }}'
        }
      })
      .state('classexercises.view', {
        url: '/:classexerciseId',
        templateUrl: 'modules/classexercises/client/views/view-classexercise.client.view.html',
        controller: 'ClassexercisesController',
        controllerAs: 'vm',
        resolve: {
          classexerciseResolve: getClassexercise
        },
        data: {
          pageTitle: 'Classexercise {{ classexerciseResolve.name }}'
        }
      });
  }

  getClassexercise.$inject = ['$stateParams', 'ClassexercisesService'];

  function getClassexercise($stateParams, ClassexercisesService) {
    return ClassexercisesService.get({
      classexerciseId: $stateParams.classexerciseId
    }).$promise;
  }

  newClassexercise.$inject = ['ClassexercisesService'];

  function newClassexercise(ClassexercisesService) {
    return new ClassexercisesService();
  }
}());
