(function(){
    
    'use strict';
    
    angular.module('applicationcodegroups').controller('ApplicationCodeModalController', function ($modalInstance, applicationcode,applicationcodegroup) {
  var vm = this;
       
        vm.applicationcodegroup=applicationcodegroup;
        vm.applicationcode = applicationcode;

        
        
  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.applicationcode);
            
  };
});
})();

(function(){
    
    'use strict';
    
angular.module('applicationcodegroups').controller('ConfirmApplicationDeleteCodeController', function ($modalInstance,applicationcode,applicationcodegroup) {
  var vm = this;
        
        vm.applicationcodegroup=applicationcodegroup;
        vm.applicationcode = applicationcode;
 
  vm.ok = function () {
    //$modalInstance.close(vm.selected.item);
  };

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.delete = function () {
    $modalInstance.close(vm.applicationcode);
            
  };
});
})();

