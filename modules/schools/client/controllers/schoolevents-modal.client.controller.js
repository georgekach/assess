(function(){
    
    'use strict';
    
    angular.module('schools').controller('SchoolEventsModalController', function ($modalInstance, school,schoolevent) {
  var vm = this;
       
        vm.school=school;
        vm.schoolevent = schoolevent;

        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    vm.format = vm.formats[0];
      
    
      vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
          };
        
         vm.startDatePopup = {
            opened: false
            };

         vm.endDatePopup = {
             opened: false
            };  
      
       vm.openStartDatePopup = function() {
    vm.startDatePopup.opened = true;
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

        
  vm.openEndDatePopup = function() {
    vm.endDatePopup.opened = true;
  };
        
  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.schoolevent);
            
  };
});
})();

(function(){
    
    'use strict';
    
angular.module('schools').controller('ConfirmDeleteSchoolEventController', function ($modalInstance,school,schoolevent) {
  var vm = this;
        
        vm.school=school;
        vm.schoolevent = schoolevent;
 
  vm.ok = function () {
    //$modalInstance.close(vm.selected.item);
  };

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.delete = function () {
    $modalInstance.close(vm.schoolevent);
            
  };
});
})();

