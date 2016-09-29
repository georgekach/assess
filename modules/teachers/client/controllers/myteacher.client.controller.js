(function () {
  'use strict';

  // Teachers controller
  angular
    .module('teachers')
    .controller('MyTeacherController', MyTeacherController);

  MyTeacherController.$inject = ['$scope', '$state', 'Authentication','SchoolsService','$window','TeachersService','ClassesInSchoolService','filterFilter','$modal','ClassregistersService','RegistersForClassService','$log','ClassExercisesForClassService','ClassexercisesService'];

  function MyTeacherController ($scope, $state, Authentication,SchoolsService,$window,TeachersService,ClassesInSchoolService,filterFilter,$modal,ClassregistersService,RegistersForClassService,$log,ClassExercisesForClassService,ClassexercisesService) {
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
      
      
      var schoolClassesPromise =  ClassesInSchoolService.query({schoolclassSchoolId: vm.authentication.user.school}).$promise;
      
      schoolClassesPromise.then(function(data){
          vm.schoolClasses = filterFilter(data,{school: vm.teacher.school});
          
          //vm.userSelectedClass = vm.schoolClasses[0];
      }, function(err){
          
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
    vm.refreshClassRegisters = refreshClassRegisters;
    vm.refreshClassExercises = refreshClassExercises;
      
      function refreshClassRegisters(){
          var classClassRegistersPromise = RegistersForClassService.query({registerclassId: vm.selectedClass._id}).$promise;
          
          classClassRegistersPromise.then(function(data){
              console.log(data);
             vm.selectedClassesRegisters = data; 
          }, function(error){
              
          });
          //TODO Add Code that calls a list of all Class Registers belonging to the selected class
      }

      function refreshClassExercises(){
          var classClassExercisesPromise = ClassExercisesForClassService.query({classExClassId: vm.selectedClass._id}).$promise;
          
          classClassExercisesPromise.then(function(data){
              console.log(data);
             vm.selectedClassesExercises = data; 
          }, function(error){
              
          });
          //TODO Add Code that calls a list of all Class Registers belonging to the selected class
      }
      
      //create Class Register 
      vm.createRegister = function(size){
            vm.classRegister = new ClassregistersService();
            vm.classRegister.schoolclass = vm.selectedClass._id;
            //vm.selectedClass.
            vm.openClassRegisterModal(size,vm.classRegister);
        };
      
      vm.createExercise = function(size){
            vm.classExercise = new ClassexercisesService();
            vm.classExercise.schoolclass = vm.selectedClass._id;
            //vm.selectedClass.
            vm.openClassExerciseModal(size,vm.classExercise);
        };
      
      
       vm.openClassRegisterModal = function (size,classRegister,selectedClass) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/classregisters/client/views/form-classregister.client.view.html',
      controller: 'ClassregistersController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          classRegisterObject: function(){
              return selectedClass;
          },
          classregisterResolve: function(){
              return vm.classRegister;
          }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      //vm.selected = selectedItem;
        if(!(selectedItem._id))
            {
             
                vm.classRegister.$save(function(res){
                    vm.refreshClassRegisters();
                },function(res){
                    vm.error = res.data.message;
                    console.log(vm.error);
                });
                
                /*(selectedItem);
                vm.school.$update();*/
            }
        else{
             vm.teacher.$update();
        }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

     
             vm.openClassExerciseModal = function (size,classExercise,selectedClass) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/classexercises/client/views/form-classexercise.client.view.html',
      controller: 'ClassexercisesController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          classRegisterObject: function(){
              return selectedClass;
          },
          classexerciseResolve: function(){
              return vm.classExercise;
          }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      //vm.selected = selectedItem;
        if(!(selectedItem._id))
            {
             
                vm.classRegister.$save(function(res){
                    vm.refreshClassRegisters();
                },function(res){
                    vm.error = res.data.message;
                    console.log(vm.error);
                });
                
                /*(selectedItem);
                vm.school.$update();*/
            }
        else{
             vm.teacher.$update();
        }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
      
      
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
