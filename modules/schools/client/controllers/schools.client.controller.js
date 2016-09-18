(function () {
  'use strict';

  // Schools controller
  angular
    .module('schools')
    .controller('SchoolsController', SchoolsController);

  SchoolsController.$inject = ['$scope', '$state', 'Authentication', 'schoolResolve','SchoolclassesService','$modal','$log','StudentsService'];

  function SchoolsController ($scope, $state, Authentication, school,SchoolclassesService,$modal,$log,StudentsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.school = school;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    
      
      
      
      
    //vm.schoolClasses = SchoolclassesService.query();

    /*
    $http.get('/api/schoolclasses').
        success(function(data, status, headers, config) {
          // do something useful with data
          vm.schoolClasses = data;
        }).
        error(function(data, status, headers, config) {
          $scope.error = 'Problem finding School classes';
        });*/

    
    // Remove existing School
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.school.$remove($state.go('schools.list'));
      }
    }

    // Save School
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.schoolForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.school._id) {
        vm.school.$update(successCallback, errorCallback);
      } else {
        vm.school.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('schools.view', {
          schoolId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
      
       vm.items = ['item1', 'item2', 'item3'];

  vm.animationsEnabled = true;

      //Create Functions for subdocuments
        vm.create = function(size){
            vm.teacher = {name:'',lastname:'',age:'0'};
            vm.open(size,vm.teacher);
        };

        vm.createSchoolClass = function(size){
            vm.schoolclass = {};
            vm.openSchoolClassModal(size,vm.schoolclass);
        };

      vm.createStudent = function(size){
            vm.student = new StudentsService() ;
           vm.student.school = vm.school._id;
            vm.openStudentModal(size,vm.student);
        };
      
       vm.createSchoolEvent = function(size){
            vm.schoolevent = {};
            vm.openSchoolEventModal(size,vm.schoolevent);
        };
      
      vm.createSubject = function(size){
            vm.subject = {};
            vm.openSubjectModal(size,vm.subject);
        };
      //Function to remove an object from an array
        vm.removeByAttr = function(arr, attr, value){
            var i = arr.length;
            while(i--){
               if( arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value ) ){ 

                   arr.splice(i,1);

               }
            }
            return arr;
        };

  vm.open = function (size,teacher) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/schools/client/views/modal-teacher.client.view.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          school: function(){
              return vm.school;
          },
          teacher: function(){
              return vm.teacher;
          }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      //vm.selected = selectedItem;
        if(!(selectedItem._id))
            {
             
                vm.school.teachers.push(selectedItem);
                vm.school.$update();
            }
        else{
            vm.school.$update();
        }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

    vm.openSchoolClassModal = function (size,schoolclass) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/schools/client/views/modal-schoolclass.client.view.html',
      controller: 'ClassesModalController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          school: function(){
              return vm.school;
          },
          schoolclass: function(){
              return vm.schoolclass;
          }
      }
    });

    modalInstance.result.then(function (schoolclass) {
      //vm.selected = selectedItem;
        if(!(schoolclass._id))
            {
             
                vm.school.schoolclasses.push(schoolclass);
                vm.school.$update();
            }
        else{
            vm.school.$update();
        }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

      
      vm.openStudentModal = function (size,student) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/students/client/views/form-student.client.view.html',
      controller: 'StudentsController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          school: function(){
              return vm.school;
          },
          student: function(){
              return vm.student;
          },
          studentResolve: function(){
               return vm.student;
          }
      }
    });

    modalInstance.result.then(function (student) {
      //vm.selected = selectedItem;
        if(!(student._id))
            {
             
                
                console.log(student);
                
                /*StudentsService.save(student,function(data){
                    console.log(data);
                });
                console.log(student);*/
                
                student.$save(function(res){
                    console.log('record saved');
                }, function(res){
                    vm.error = res.data.message;
                    console.log(vm.error);
                });
                
                 console.log(student.id);
                //vm.school.students.push(student.id);
                //vm.school.$update();
            }
        else{
            
            student.$update(function(res){
                
            },function(res){
                vm.error = res.data.message;
            });
            
            //vm.school.$update();
        }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
      
      
      vm.openSubjectModal = function (size,subject) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/schools/client/views/modal-subject.client.view.html',
      controller: 'SubjectsModalController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          school: function(){
              return vm.school;
          },
          subject: function(){
              return vm.subject;
          }
      }
    });

    modalInstance.result.then(function (subject) {
      //vm.selected = selectedItem;
        if(!(subject._id))
            {
             
                vm.school.subjects.push(subject);
                vm.school.$update();
            }
        else{
            vm.school.$update();
        }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
      
  vm.openSchoolEventModal = function (size,schoolevent) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/schools/client/views/modal-schoolevent.client.view.html',
      controller: 'SchoolEventsModalController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          school: function(){
              return vm.school;
          },
          schoolevent: function(){
              return vm.schoolevent;
          }
      }
    });

    modalInstance.result.then(function (schoolevent) {
      //vm.selected = selectedItem;
        if(!(schoolevent._id))
            {
             
                vm.school.schoolevents.push(schoolevent);
                vm.school.$update();
            }
        else{
            vm.school.$update();
        }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };    
      
  vm.toggleAnimation = function () {
    vm.animationsEnabled = !vm.animationsEnabled;
  };
      
      //confirm delete
      vm.confirmdelete = function (size,teacher) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/schools/client/views/modal-dialog-client.view.html',
      controller: 'ConfirmDeleteCtrl',
      controllerAs: 'vm',
      size: size,
      resolve: {    
          school: function(){
              return vm.school;
          },
          teacher: function(){
              return vm.teacher;
          }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      
        vm.removeByAttr(vm.school.teachers,'_id',selectedItem._id);
         vm.school.$update();
        /*if(!(selectedItem._id))
            {
             
                vm.school.teachers.push(selectedItem);
                vm.school.$update();
            }*/
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
      
      //confirmDeleteSchoolClass
            vm.confirmDeleteSchoolClass = function (size,schoolclass) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/schools/client/views/modal-dialog-schoolclass.client.view.html',
      controller: 'ConfirmDeleteSchoolClassesController',
      controllerAs: 'vm',
      size: size,
      resolve: {    
          school: function(){
              return vm.school;
          },
          schoolclass: function(){
              return vm.schoolclass;
          }
      }
    });

    modalInstance.result.then(function (schoolclass) {
      
        vm.removeByAttr(vm.school.schoolclasses,'_id',schoolclass._id);
         vm.school.$update();
        /*if(!(selectedItem._id))
            {
             
                vm.school.teachers.push(selectedItem);
                vm.school.$update();
            }*/
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
      
      
      //confirmDeleteSchoolClass
            vm.confirmDeleteStudent = function (size,student) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/schools/client/views/modal-dialog-student-client.view.html',
      controller: 'ConfirmDeleteStudentsController',
      controllerAs: 'vm',
      size: size,
      resolve: {    
          school: function(){
              return vm.school;
          },
          student: function(){
              return vm.student;
          }
      }
    });

    modalInstance.result.then(function (student) {
      
        vm.removeByAttr(vm.school.students,'_id',student._id);
         vm.school.$update();
        /*if(!(selectedItem._id))
            {
             
                vm.school.teachers.push(selectedItem);
                vm.school.$update();
            }*/
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
      
      //COnfirm delete Schoo event
      vm.confirmDeleteSchoolEvent = function (size,schoolevent) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/schools/client/views/modal-dialog-schoolevent-client.view.html',
      controller: 'ConfirmDeleteSchoolEventController',
      controllerAs: 'vm',
      size: size,
      resolve: {    
          school: function(){
              return vm.school;
          },
          schoolevent: function(){
              return vm.schoolevent;
          }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      
        vm.removeByAttr(vm.school.schoolevents,'_id',selectedItem._id);
         vm.school.$update();
        /*if(!(selectedItem._id))
            {
             
                vm.school.schoolevents.push(selectedItem);
                vm.school.$update();
            }*/
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
      
      //confirmDeleteSchoolClass
            vm.confirmDeleteSubject = function (size,student) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/schools/client/views/modal-dialog-subject-client.view.html',
      controller: 'ConfirmDeleteSubjectController',
      controllerAs: 'vm',
      size: size,
      resolve: {    
          school: function(){
              return vm.school;
          },
          student: function(){
              return vm.student;
          }
      }
    });

    modalInstance.result.then(function (subject) {
      
        vm.removeByAttr(vm.school.subjects,'_id',subject._id);
         vm.school.$update();
        /*if(!(selectedItem._id))
            {
             
                vm.school.teachers.push(selectedItem);
                vm.school.$update();
            }*/
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  }
})();

