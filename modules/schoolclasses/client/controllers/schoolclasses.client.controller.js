(function () {
  'use strict';

  // Schoolclasses controller
  angular
    .module('schoolclasses')
    .controller('SchoolclassesController', SchoolclassesController);

  SchoolclassesController.$inject = ['$scope', '$state', 'Authentication', 'schoolclassResolve','$modalInstance','ClassesInSchoolService','filterFilter','$filter','$window','SubjectsInSchoolService'];

  function SchoolclassesController ($scope, $state, Authentication, schoolclass,$modalInstance,ClassesInSchoolService,filterFilter,$filter,$window,SubjectsInSchoolService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.schoolclass = schoolclass;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    //vm.save = save;

    var nextclassesPromise = ClassesInSchoolService.query({schoolclassSchoolId: schoolclass.school}).$promise;
      
      nextclassesPromise.then(function(data){
          
          vm.nextclasses = filterFilter(data,{_id:'!'+vm.schoolclass._id});
      },function(err){
          
          
      });
      
      var schoolsSubjectsPromise = SubjectsInSchoolService.query({subjectsSchoolId: schoolclass.school}).$promise;
      
      schoolsSubjectsPromise.then(function(data){
          vm.schoolSubjects = data;
      },function(err){
          
      });
      
    // Remove existing Schoolclass
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.schoolclass.$remove($state.go('schoolclasses.list'));
      }
    }
      
              vm.addSubject = function() {
    vm.schoolclass.subjects.push({
      
    });
  };
        vm.showSubjectName = function(c){
            var result = $window._.findWhere(vm.schoolSubjects, {_id : c});
            if(result)
                return result.name;
            else
            return 'empty';
          
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
      
    // Save Schoolclass
    /*function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.schoolclassForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.schoolclass._id) {
        vm.schoolclass.$update(successCallback, errorCallback);
      } else {
        vm.schoolclass.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('schoolclasses.view', {
          schoolclassId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }*/
  }
})();
