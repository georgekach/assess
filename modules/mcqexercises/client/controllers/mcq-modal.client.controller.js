(function(){
    
    'use strict';
    
    angular.module('mcqexercises').controller('McqModalController', function ($modalInstance, mcqexercise,question, $filter) {
  var vm = this;
       
        vm.mcqexercise=mcqexercise;
        vm.question = question;
        
        
        vm.addAnswer = function() {
    vm.question.possibleanswers.push({
      choiceletter: '',
      answertext: ''
    });
  };
        
      vm.saveTable = function() {
    var results = [];
    for (var i = vm.question.possibleanswers.length; i--;) {
      var ans = vm.question.possibleanswers[i];
      // actually delete user
      if (ans.isDeleted) {
        vm.question.possibleanswers.splice(i, 1);
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
  vm.deleteAnswer = function(id) {
    var filtered = $filter('filter')(vm.mcqexercise.possibleanswers, {id: id});
    if (filtered.length) {
      filtered[0].isDeleted = true;
    }
  };

  vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.question);
            
  };
});
})();

(function(){
    
    'use strict';
    
angular.module('mcqexercises').controller('ConfirmDeleteMcqController', function ($modalInstance,mcqexercise,question) {
  var vm = this;
        
        vm.mcqexercise=mcqexercise;
        vm.question = question;
 
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

