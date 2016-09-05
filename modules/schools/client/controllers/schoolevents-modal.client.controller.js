(function(){
    
    'use strict';
    
    angular.module('schools').controller('SchoolEventsModalController', function ($modalInstance, school,schoolevent) {
  var vm = this;
       
        vm.school=school;
        vm.schoolevent = schoolevent;

        
        
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

