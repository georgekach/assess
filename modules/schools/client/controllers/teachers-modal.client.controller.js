(function(){
    
    'use strict';
    
    angular.module('schools').controller('ModalInstanceCtrl', function ($modalInstance, school,teacher) {
  var vm = this;
       
        vm.school=school;
        vm.teacher = teacher;
        vm.selectedclass = '';
 
vm.add = function() {
        vm.teacher.classes.push(vm.selectedclass);
    };
  
         // remove an item
    vm.remove = function(index) {
    	vm.teacher.classes.splice(index, 1);
    };

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.teacher);
            
  };
});
})();

(function(){
    
    'use strict';
    
angular.module('schools').controller('ConfirmDeleteCtrl', function ($modalInstance,school,teacher) {
  var vm = this;
        
        vm.school=school;
        vm.teacher = teacher;
 
  vm.ok = function () {
    //$modalInstance.close(vm.selected.item);
  };

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.delete = function () {
    $modalInstance.close(vm.teacher);
            
  };
});
})();


