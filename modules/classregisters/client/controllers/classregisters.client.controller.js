(function () {
  'use strict';

  // Classregisters controller
  angular
    .module('classregisters')
    .controller('ClassregistersController', ClassregistersController);

  ClassregistersController.$inject = ['$scope', '$state', 'Authentication', 'classregisterResolve'];

  function ClassregistersController ($scope, $state, Authentication, classregister) {
    var vm = this;

    vm.authentication = Authentication;
    vm.classregister = classregister;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Classregister
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.classregister.$remove($state.go('classregisters.list'));
      }
    }

    // Save Classregister
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.classregisterForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.classregister._id) {
        vm.classregister.$update(successCallback, errorCallback);
      } else {
        vm.classregister.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('classregisters.view', {
          classregisterId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
