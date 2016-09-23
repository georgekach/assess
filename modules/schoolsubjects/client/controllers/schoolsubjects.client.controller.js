(function () {
  'use strict';

  // Schoolsubjects controller
  angular
    .module('schoolsubjects')
    .controller('SchoolsubjectsController', SchoolsubjectsController);

  SchoolsubjectsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'schoolsubjectResolve','$modalInstance'];

  function SchoolsubjectsController ($scope, $state, $window, Authentication, schoolsubject,$modalInstance) {
    var vm = this;

    vm.authentication = Authentication;
    vm.schoolsubject = schoolsubject;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    //vm.save = save;

    // Remove existing Schoolsubject
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.schoolsubject.$remove($state.go('schoolsubjects.list'));
      }
    }

       vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
        
     vm.save = function () {
      $modalInstance.close(vm.schoolsubject);
      };
    // Save Schoolsubject
/*    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.schoolsubjectForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.schoolsubject._id) {
        vm.schoolsubject.$update(successCallback, errorCallback);
      } else {
        vm.schoolsubject.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('schoolsubjects.view', {
          schoolsubjectId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }*/
  }
}());
