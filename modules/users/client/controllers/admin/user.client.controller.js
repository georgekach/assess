'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve','SchoolsService','TeachersService','filterFilter','GuardiansService',
  function ($scope, $state, Authentication, userResolve,SchoolsService,TeachersService,filterFilter,GuardiansService) {
    $scope.authentication = Authentication;
    $scope.user = userResolve;
      $scope.schools= SchoolsService.query();
      var schoolsteachersPromise = TeachersService.query().$promise;
      
      schoolsteachersPromise.then(function(results){
         var schoolsteachers = results; 
          
          if($scope.user.school)
          {
              console.log('im here');
             $scope.teachers = filterFilter( results,{school: $scope.user.school});
          }
      });
      
      // fill up the guardians
     var guardiansPromise = GuardiansService.query().$promise;
      guardiansPromise.then(function(results){
         $scope.guardians = results; 
      });
    
      
    $scope.remove = function (user) {
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = $scope.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
