(function () {
  'use strict';

  angular
    .module('teachers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('teacher', {
        abstract: true,
        url: '/teacher',
        template: '<ui-view/>'
      })
      .state('teacher.view', {
        url: '',
        templateUrl: 'modules/teachers/client/views/view-myteacher.client.view.html',
        controller: 'MyTeacherController',
        controllerAs: 'vm',
        data:{
          pageTitle: 'My Teacher View '
        }
      });
  }
    
   
    
})();