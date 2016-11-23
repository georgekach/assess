(function () {
  'use strict';

  // Mediaresources controller
  angular
    .module('mediaresources')
    .controller('MediaresourcesController', MediaresourcesController);

  MediaresourcesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'mediaresourceResolve','$modalInstance','FileUploader','$timeout'];

  function MediaresourcesController ($scope, $state, $window, Authentication, mediaresource,$modalInstance,FileUploader,$timeout) {
    var vm = this;

    vm.authentication = Authentication;
    vm.mediaresource = mediaresource;
    //$scope.mediaresource = mediaresource;
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
      
      
      vm.imageURL = vm.mediaresource.attachment;

    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/mresources/picture',
      alias: 'newMediaResource'
    });

    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    vm.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
              
              vm.mediaresource.attachment = fileReaderEvent.target.result;
              
          }, 0);
            /*vm.imageURL = fileReaderEvent.target.result;
          }, 0);*/
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      // Populate user object
      //vm.user = Authentication.user = response;
        vm.mediaresource.attachment = response.destination+ response.filename;
        console.log(response);

      // Clear upload buttons
      vm.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    vm.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      vm.cancelUpload();

      // Show error message
      vm.error = response.message;
        console.log('error'+ vm.error);
    };

    // Change user profile picture
    vm.uploadMedeiaResource = function () {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    };

    // Cancel the upload process
    vm.cancelUpload = function () {
      vm.uploader.clearQueue();
      vm.imageURL = vm.mediaresource.attachment;
    };
      
      
  }
}());
