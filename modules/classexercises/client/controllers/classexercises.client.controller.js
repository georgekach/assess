(function () {
  'use strict';

  // Classexercises controller
  angular
    .module('classexercises')
    .controller('ClassexercisesController', ClassexercisesController);

  ClassexercisesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'classexerciseResolve','$modalInstance'];

  function ClassexercisesController ($scope, $state, $window, Authentication, classexercise,$modalInstance) {
    var vm = this;

    vm.authentication = Authentication;
    vm.classexercise = classexercise;
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
        
         vm.dateOfExDatePopup = {
            opened: false
            };

         
      /*vm.publishStartDatePopup = {
            opened: false
            };

         vm.publishEndDatePopup = {
             opened: false
            };*/
      
       vm.openDateOfExDatePopup = function() {
    vm.dateOfExDatePopup.opened = true;
  };

 

 /*vm.openPublishEndDatePopup = function() {
    vm.publishEndDatePopup.opened = true;
  };*/
         // Disable weekend selection
  vm.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };
 
      
      
      
    // Remove existing Classexercise
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.classexercise.$remove($state.go('classexercises.list'));
      }
    }

      vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.classregister);
            
  };
    // Save Classexercise
/*    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.classexerciseForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.classexercise._id) {
        vm.classexercise.$update(successCallback, errorCallback);
      } else {
        vm.classexercise.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('classexercises.view', {
          classexerciseId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }*/
  }
}());
