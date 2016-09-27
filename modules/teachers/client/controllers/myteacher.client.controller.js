(function () {
  'use strict';

  // Teachers controller
  angular
    .module('teachers')
    .controller('MyTeacherController', MyTeacherController);

  MyTeacherController.$inject = ['$scope', '$state', 'Authentication','SchoolsService','$window','TeachersService'];

  function MyTeacherController ($scope, $state, Authentication,SchoolsService,$window,TeachersService) {
    var vm = this;

    vm.authentication = Authentication;
    //console.log(vm.authentication.user.school);
     var schoolPromise = SchoolsService.get({
      schoolId: vm.authentication.user.school
    }).$promise;
      
      console.log(vm.authentication.user.teacher);
      
      var teacherPromise = TeachersService.get({teacherId:vm.authentication.user.teacher}).$promise;
      
      teacherPromise.then(function(teacher){
         if(teacher)
             {
          vm.teacher = teacher;       
             }
          
      },function(error){
          
      });
      
      schoolPromise.then(function(v){
          vm.school = v;
          /*vm.teacher = 
          $window._.findWhere(v.teachers, {_id : vm.authentication.user.teacher})
          ;
          console.log(vm.teacher);*/
          //console.log(v);
      });
      
      //console.log(vm.teachers);
      //vm.teacher = $window._.findWhere(vm.teachers, {_id : //vm.authentication.user.teacher});
      //console.log(vm.teacher);
      //console.log(vm.authentication);

    //vm.teacher = vm.school.teachers[0];
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Teacher
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.teacher.$remove($state.go('teachers.list'));
      }
    }

    // Save Teacher
    function save(isValid) {
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
    }
  }
})();
