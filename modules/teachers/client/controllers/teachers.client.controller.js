(function () {
  'use strict';

  // Teachers controller
  angular
    .module('teachers')
    .controller('TeachersController', TeachersController);

  TeachersController.$inject = ['$scope', '$state', 'Authentication', 'teacherResolve','$modalInstance','ClassesInSchoolService','filterFilter','TeachersInSchoolService','$window'];

  function TeachersController ($scope, $state, Authentication, teacher,$modalInstance,ClassesInSchoolService,filterFilter,TeachersInSchoolService,$window) {
    var vm = this;

    vm.authentication = Authentication;
    vm.teacher = teacher;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
  
      var schoolClassesPromise =  ClassesInSchoolService.query({schoolclassSchoolId: vm.teacher.school}).$promise;
      
      schoolClassesPromise.then(function(data){
          vm.schoolClasses = filterFilter(data,{school: vm.teacher.school});
          
          vm.userSelectedClass = vm.schoolClasses[0];
      }, function(err){
          
      });
      
      var reportToPromise = TeachersInSchoolService.query({teachersSchoolId:vm.teacher.school}).$promise;
      
      reportToPromise.then(function(data){
          vm.reportsTo = filterFilter(data,{_id:'!'+vm.teacher._id});
      },function(err){
          
      });
      

      vm.selectedclass = '';
      
      
      // adding a class to the teacher
      vm.addTeachersClass = function() {
        vm.teacher.classes.push(vm.selectedclass);
    };
  
         // remove a class from a item
    vm.remove = function(index) {
    	vm.teacher.classes.splice(index, 1);
    };
      
      // Cancel Closing modal
      vm.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
        
        vm.save = function () {
    $modalInstance.close(vm.teacher);
            
  };
      
    // Remove existing Teacher
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.teacher.$remove($state.go('teachers.list'));
      }
    }

      vm.save = function () {
    $modalInstance.close(vm.teacher);
            
  };
  
  vm.showClassName = function(c){
            var result = $window._.findWhere(vm.schoolClasses, {_id : c});
            if(result)
                return result.name;
            else
            return 'empty';
          
        };    
      
    // Save Teacher
/*    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.teacherForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.teacher._id) {
        vm.teacher.$update(successCallback, errorCallback);
      } else {
        vm.teacher.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('teachers.view', {
          teacherId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }*/
  }
})();
