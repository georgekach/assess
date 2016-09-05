(function () {
  'use strict';

  angular
    .module('schools')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('schooladmin', {
        abstract: true,
        url: '/schooladmin',
        template: '<ui-view/>'
      })
      .state('schooladmin.view', {
        url: '',
        templateUrl: 'modules/schools/client/views/view-myschooladmin.client.view.html',
        controller: 'SchoolsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'My School Admin View'
        }
      });
  }
})();