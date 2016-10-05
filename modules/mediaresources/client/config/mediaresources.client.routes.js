(function () {
  'use strict';

  angular
    .module('mediaresources')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('mediaresources', {
        abstract: true,
        url: '/mediaresources',
        template: '<ui-view/>'
      })
      .state('mediaresources.list', {
        url: '',
        templateUrl: 'modules/mediaresources/client/views/list-mediaresources.client.view.html',
        controller: 'MediaresourcesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Mediaresources List'
        }
      })
      .state('mediaresources.create', {
        url: '/create',
        templateUrl: 'modules/mediaresources/client/views/form-mediaresource.client.view.html',
        controller: 'MediaresourcesController',
        controllerAs: 'vm',
        resolve: {
          mediaresourceResolve: newMediaresource
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mediaresources Create'
        }
      })
      .state('mediaresources.edit', {
        url: '/:mediaresourceId/edit',
        templateUrl: 'modules/mediaresources/client/views/form-mediaresource.client.view.html',
        controller: 'MediaresourcesController',
        controllerAs: 'vm',
        resolve: {
          mediaresourceResolve: getMediaresource
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Mediaresource {{ mediaresourceResolve.name }}'
        }
      })
      .state('mediaresources.view', {
        url: '/:mediaresourceId',
        templateUrl: 'modules/mediaresources/client/views/view-mediaresource.client.view.html',
        controller: 'MediaresourcesController',
        controllerAs: 'vm',
        resolve: {
          mediaresourceResolve: getMediaresource
        },
        data: {
          pageTitle: 'Mediaresource {{ mediaresourceResolve.name }}'
        }
      });
  }

  getMediaresource.$inject = ['$stateParams', 'MediaresourcesService'];

  function getMediaresource($stateParams, MediaresourcesService) {
    return MediaresourcesService.get({
      mediaresourceId: $stateParams.mediaresourceId
    }).$promise;
  }

  newMediaresource.$inject = ['MediaresourcesService'];

  function newMediaresource(MediaresourcesService) {
    return new MediaresourcesService();
  }
}());
