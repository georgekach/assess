(function () {
  'use strict';

  angular
    .module('mcqexercises')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('mcqexercises', {
        abstract: true,
        url: '/mcqexercises',
        template: '<ui-view/>'
      })
      .state('mcqexercises.list', {
        url: '',
        templateUrl: 'modules/mcqexercises/client/views/list-mcqexercises.client.view.html',
        controller: 'McqexercisesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Mcqexercises List'
        }
      })
      .state('mcqexercises.create', {
        url: '/create',
        templateUrl: 'modules/mcqexercises/client/views/form-mcqexercise.client.view.html',
        controller: 'McqexercisesController',
        controllerAs: 'vm',
        resolve: {
          mcqexerciseResolve: newMcqexercise
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mcqexercises Create'
        }
      })
      .state('mcqexercises.edit', {
        url: '/:mcqexerciseId/edit',
        templateUrl: 'modules/mcqexercises/client/views/form-mcqexercise.client.view.html',
        controller: 'McqexercisesController',
        controllerAs: 'vm',
        resolve: {
          mcqexerciseResolve: getMcqexercise
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Mcqexercise {{ mcqexerciseResolve.name }}'
        }
      })
      .state('mcqexercises.view', {
        url: '/:mcqexerciseId',
        templateUrl: 'modules/mcqexercises/client/views/view-mcqexercise.client.view.html',
        controller: 'McqexercisesController',
        controllerAs: 'vm',
        resolve: {
          mcqexerciseResolve: getMcqexercise
        },
        data: {
          pageTitle: 'Mcqexercise {{ mcqexerciseResolve.name }}'
        }
      })
        .state('mcqexercises.write', {
        url: '/:mcqexerciseId/write',
        templateUrl: 'modules/mcqexercises/client/views/form-write-mcqexercise.client.view.html',
        controller: 'McqexercisesController',
        controllerAs: 'vm',
        resolve: {
          mcqexerciseResolve: getMcqexercise
        },
        data: {
          pageTitle: 'Mcqexercise {{ mcqexerciseResolve.name }}'
        }
      });
  }

  getMcqexercise.$inject = ['$stateParams', 'McqexercisesService'];

  function getMcqexercise($stateParams, McqexercisesService) {
    return McqexercisesService.get({
      mcqexerciseId: $stateParams.mcqexerciseId
    }).$promise;
  }

  newMcqexercise.$inject = ['McqexercisesService'];

  function newMcqexercise(McqexercisesService) {
    return new McqexercisesService();
  }
}());
