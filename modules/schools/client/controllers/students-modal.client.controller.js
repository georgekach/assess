(function(){
    
    'use strict';
    
    angular.module('schools').controller('StudentsModalController', function ($modalInstance, school,student) {
  var vm = this;
       
        vm.school=school;
        vm.student = student;

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.student);
            
  };
});
})();

(function(){
    
    'use strict';
    
angular.module('schools').controller('ConfirmDeleteStudentsController', function ($modalInstance,school,student) {
  var vm = this;
        
        vm.school=school;
        vm.student = student;
 
  vm.ok = function () {
    //$modalInstance.close(vm.selected.item);
  };

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.delete = function () {
    $modalInstance.close(vm.student);
            
  };
});
})();

