(function () {
  'use strict';

  // Schoolevents controller
  angular
    .module('schoolevents')
    .controller('SchooleventsController', SchooleventsController);

  SchooleventsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'schooleventResolve','$modalInstance'];

  function SchooleventsController ($scope, $state, $window, Authentication, schoolevent,$modalInstance) {
    var vm = this;

    vm.authentication = Authentication;
    vm.schoolevent = schoolevent;
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
        
         vm.startDatePopup = {
            opened: false
            };

         vm.endDatePopup = {
             opened: false
            }; 
      
      vm.publishStartDatePopup = {
            opened: false
            };

         vm.publishEndDatePopup = {
             opened: false
            };
      
       vm.openStartDatePopup = function() {
    vm.startDatePopup.opened = true;
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

        
  vm.openEndDatePopup = function() {
    vm.endDatePopup.opened = true;
  };
        
  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.schoolevent);
            
  };

    // Remove existing Schoolevent
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.schoolevent.$remove($state.go('schoolevents.list'));
      }
    }

    // Save Schoolevent
/*    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.schooleventForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.schoolevent._id) {
        vm.schoolevent.$update(successCallback, errorCallback);
      } else {
        vm.schoolevent.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('schoolevents.view', {
          schooleventId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }*/
  }
}());
