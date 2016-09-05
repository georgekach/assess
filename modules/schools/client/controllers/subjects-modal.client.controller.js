(function(){
    
    'use strict';
    
    angular.module('schools').controller('SubjectsModalController', function ($modalInstance, school,subject) {
  var vm = this;
       
        vm.school=school;
        vm.subject = subject;

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.subject);
            
  };
});
})();

(function(){
    
    'use strict';
    
angular.module('schools').controller('ConfirmDeleteSubjectController', function ($modalInstance,school,subject) {
  var vm = this;
        
        vm.school=school;
        vm.subject = subject;
 
  vm.ok = function () {
    //$modalInstance.close(vm.selected.item);
  };

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.delete = function () {
    $modalInstance.close(vm.subject);
            
  };
});
})();

