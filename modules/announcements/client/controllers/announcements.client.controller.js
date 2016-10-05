(function () {
  'use strict';

  // Announcements controller
  angular
    .module('announcements')
    .controller('AnnouncementsController', AnnouncementsController);

  AnnouncementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'announcementResolve','$modalInstance'];

  function AnnouncementsController ($scope, $state, $window, Authentication, announcement,$modalInstance) {
    var vm = this;

    vm.authentication = Authentication;
    vm.announcement = announcement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    //vm.save = save;
      
      vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    vm.format = vm.formats[0];
      
        vm.maxDate= new Date(2020, 5, 22);
            vm.minDate=new Date();
    
      vm.dateOptions = {
            
            formatYear: 'yy',            
            startingDay: 1
          };
        
        /* vm.dateOfExDatePopup = {
            opened: false
            };*/

         
     vm.publishStartDatePopup = {
            opened: false
            };

          vm.publishEndDatePopup = {
             opened: false
            };
      
       vm.openPublishStartDatePopup = function() {
    vm.publishStartDatePopup.opened = true;
  };

 

 vm.openPublishEndDatePopup = function() {
    vm.publishEndDatePopup.opened = true;
  };
         // Disable weekend selection
  vm.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

    // Remove existing Announcement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.announcement.$remove($state.go('announcements.list'));
      }
    }

    // Save Announcement
    /*function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.announcementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.announcement._id) {
        vm.announcement.$update(successCallback, errorCallback);
      } else {
        vm.announcement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('announcements.view', {
          announcementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }*/
      
      
      vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.announcement);
            
  };
  }
}());
