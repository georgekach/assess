(function () {
  'use strict';

  angular
    .module('guardians')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('guardian', {
        abstract: true,
        url: '/guardian',
        template: '<ui-view/>'
      })
    .state('guardian.view', {
        url: '',
        templateUrl: 'modules/guardians/client/views/view-myguardian.client.view.html',
        controller: 'GuardiansListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'My Guardian View'
        }
      });
  }
})();