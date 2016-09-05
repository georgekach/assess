(function () {
  'use strict';

  // Schoolterms controller
  angular
    .module('schoolterms')
    .controller('SchooltermsController', SchooltermsController);

  SchooltermsController.$inject = ['$scope', '$state', 'Authentication', 'schooltermResolve'];

  function SchooltermsController ($scope, $state, Authentication, schoolterm) {
    var vm = this;

    vm.authentication = Authentication;
    vm.schoolterm = schoolterm;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Schoolterm
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.schoolterm.$remove($state.go('schoolterms.list'));
      }
    }

    // Save Schoolterm
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.schooltermForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.schoolterm._id) {
        vm.schoolterm.$update(successCallback, errorCallback);
      } else {
        vm.schoolterm.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('schoolterms.view', {
          schooltermId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
