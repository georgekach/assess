(function () {
  'use strict';

  // Guardians controller
  angular
    .module('guardians')
    .controller('GuardiansController', GuardiansController);

  GuardiansController.$inject = ['$scope', '$state', 'Authentication', 'guardianResolve'];

  function GuardiansController ($scope, $state, Authentication, guardian) {
    var vm = this;

    vm.authentication = Authentication;
    vm.guardian = guardian;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Guardian
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.guardian.$remove($state.go('guardians.list'));
      }
    }

    // Save Guardian
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.guardianForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.guardian._id) {
        vm.guardian.$update(successCallback, errorCallback);
      } else {
        vm.guardian.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('guardians.view', {
          guardianId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
