(function () {
  'use strict';

  // Schoolclasses controller
  angular
    .module('schoolclasses')
    .controller('SchoolclassesController', SchoolclassesController);

  SchoolclassesController.$inject = ['$scope', '$state', 'Authentication', 'schoolclassResolve'];

  function SchoolclassesController ($scope, $state, Authentication, schoolclass) {
    var vm = this;

    vm.authentication = Authentication;
    vm.schoolclass = schoolclass;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Schoolclass
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.schoolclass.$remove($state.go('schoolclasses.list'));
      }
    }

    // Save Schoolclass
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.schoolclassForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.schoolclass._id) {
        vm.schoolclass.$update(successCallback, errorCallback);
      } else {
        vm.schoolclass.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('schoolclasses.view', {
          schoolclassId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
