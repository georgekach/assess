(function () {
  'use strict';

  // Classregisters controller
  angular
    .module('classregisters')
    .controller('ClassregistersController', ClassregistersController);

  ClassregistersController.$inject = ['$scope', '$state', 'Authentication', 'classregisterResolve','$modalInstance'];

  function ClassregistersController ($scope, $state, Authentication, classregister,$modalInstance) {
    var vm = this;

    vm.authentication = Authentication;
    vm.classregister = classregister;
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
        
         vm.datemarkedDatePopup = {
            opened: false
            };

         vm.dateofregisterDatePopup = {
             opened: false
            }; 
      
      /*vm.publishStartDatePopup = {
            opened: false
            };

         vm.publishEndDatePopup = {
             opened: false
            };*/
      
       vm.openDatemarkedPopup = function() {
    vm.datemarkedDatePopup.opened = true;
  };

 vm.openDateofregisterPopup = function() {
    vm.dateofregisterDatePopup.opened = true;
  };

 /*vm.openPublishEndDatePopup = function() {
    vm.publishEndDatePopup.opened = true;
  };*/
         // Disable weekend selection
  vm.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

        
     
      
      
    // Remove existing Classregister
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.classregister.$remove($state.go('classregisters.list'));
      }
    }

       vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.classregister);
            
  };
      
      
    // Save Classregister
 /*   function save(isValid) {
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
    }*/
  }
})();
