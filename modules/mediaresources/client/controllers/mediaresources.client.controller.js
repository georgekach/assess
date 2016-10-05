(function () {
  'use strict';

  // Mediaresources controller
  angular
    .module('mediaresources')
    .controller('MediaresourcesController', MediaresourcesController);

  MediaresourcesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'mediaresourceResolve','$modalInstance'];

  function MediaresourcesController ($scope, $state, $window, Authentication, mediaresource,$modalInstance) {
    var vm = this;

    vm.authentication = Authentication;
    vm.mediaresource = mediaresource;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    //vm.save = save;

    // Remove existing Mediaresource
    function remove() {
      if ($window.confirm('Are you sure you want to delete? ')) {
        vm.mediaresource.$remove($state.go('mediaresources.list'));
      }
    }
      
      vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.mediaresource);
            
  };

    // Save Mediaresource
  /*  function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.mediaresourceForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.mediaresource._id) {
        vm.mediaresource.$update(successCallback, errorCallback);
      } else {
        vm.mediaresource.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('mediaresources.view', {
          mediaresourceId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }*/
  }
}());
