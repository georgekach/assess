(function () {
  'use strict';

  // Schools controller
  angular
    .module('schools')
    .controller('MySchoolAdminController', MySchoolAdminController);

  MySchoolAdminController.$inject = ['$scope', '$state', 'Authentication', '$modal','$log','SchoolsService'];

  function MySchoolAdminController ($scope, $state, Authentication, $modal,$log,SchoolsService) {
    var vm = this;

    vm.authentication = Authentication;
   // vm.school = Authentication.user.school;
    vm.error = null;

      
    var schoolsPromise = SchoolsService.get({schoolId: Authentication.user.school}).$promise;
      
      schoolsPromise.then(function(s){
          console.log(s);
          vm.school = s;
          
      });
      
      
      
  }
})();

