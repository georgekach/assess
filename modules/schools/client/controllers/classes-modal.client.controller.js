(function(){
    
    'use strict';
    
    angular.module('schools').controller('ClassesModalController', function ($modalInstance, school,schoolclass,$filter) {
  var vm = this;
       
        vm.school=school;
        vm.schoolclass = schoolclass;

        vm.addSubject = function() {
    vm.schoolclass.subjects.push({
      
    });
  };
        
      vm.saveTable = function() {
    var results = [];
    for (var i = vm.schoolclass.subjects.length; i--;) {
      var ans = vm.schoolclass.subjects[i];
      // actually delete user
      if (ans.isDeleted) {
        vm.schoolclass.subjects.splice(i, 1);
      }
      // mark as not new 
      if (ans.isNew) {
        ans.isNew = false;
      }

      // send on server
      //results.push($http.post('/saveUser', user));      
    }

    //return $q.all(results);
  };  
        
        // mark user as deleted
  vm.deleteSubject = function(id) {
    var filtered = $filter('filter')(vm.schoolclass.subjects, {id: id});
    if (filtered.length) {
      filtered[0].isDeleted = true;
    }
  };
        
  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.schoolclass);
            
  };
});
})();

(function(){
    
    'use strict';
    
angular.module('schools').controller('ConfirmDeleteSchoolClassesController', function ($modalInstance,school,schoolclass) {
  var vm = this;
        
        vm.school=school;
        vm.schoolclass = schoolclass;
 
  vm.ok = function () {
    //$modalInstance.close(vm.selected.item);
  };

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.delete = function () {
    $modalInstance.close(vm.schoolclass);
            
  };
});
})();

