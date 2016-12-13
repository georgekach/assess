(function () {
  'use strict';

  // Schools controller
  angular
    .module('schools')
    .controller('SchoolsController', SchoolsController);

  SchoolsController.$inject = ['$scope', '$state', 'Authentication', 'schoolResolve','SchoolclassesService','$modal','$log','StudentsService','filterFilter','TeachersService','SchooleventsService','SchoolsubjectsService','ApplicationcodegroupsService'];

  function SchoolsController ($scope, $state, Authentication, school,SchoolclassesService,$modal,$log,StudentsService,filterFilter,TeachersService,SchooleventsService,SchoolsubjectsService,ApplicationcodegroupsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.school = school;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.removeStudent = removeStudent;
    vm.removeTeacher = removeTeacher;
    vm.removeSchoolClass = removeSchoolClass;
    vm.save = save;
    vm.refreshStudents = refreshStudentsList;
    vm.refreshTeachers = refreshTeachers;
    vm.refreshSchoolClasses = refreshSchoolClasses;
    vm.refreshSchoolEvents = refreshSchoolEvents;
    vm.refreshSchoolSubjects = refreshSchoolSubjects;
    
      var applicationCodesPromise = ApplicationcodegroupsService.query().$promise;
      
      applicationCodesPromise.then(function(applicationCodegroups){
          var res = applicationCodegroups;
          
          vm.schooltypeCodeGroup = filterFilter(applicationCodegroups,{groupcode:'schooltype'});
          
          if( vm.schooltypeCodeGroup.length >0){
              vm.schoolTypes = vm.schooltypeCodeGroup[0].applicationcodes;
          }
          //console.log( vm.schoolTypes);
      });
     
      function refreshStudentsList (){
          var schoolstudentsPromise = StudentsService.query().$promise;
      
          schoolstudentsPromise.then(function(result){

              var resultsArray = result;

               vm.schoolstudents = filterFilter(resultsArray,{school:vm.school._id});
              console.log(vm.schoolstudents.length);
          },function(err){

          });
      }
      
      function refreshTeachers(){
          var schoolsTeachersPromise = TeachersService.query().$promise;
          schoolsTeachersPromise.then(function(results){
              
              var resultsArray = results;
              vm.schoolsTeachers = filterFilter(resultsArray,{school:vm.school._id});
          },function(err){
              
          });
          
      }
      
      function refreshSchoolClasses(){
          var schoolClassesPromise = SchoolclassesService.query().$promise;
          schoolClassesPromise.then(function(result){
              var resArray = result;
              
              vm.schoolClasses = filterFilter(resArray,{school: vm.school._id});
          }, function(err){
              //todo add code for error here
          });
      }
      
      function refreshSchoolEvents(){
          var schoolEventsPromise = SchooleventsService.query().$promise;
          schoolEventsPromise.then(function(results){
              var resultsArray = results;
              vm.schoolevents = filterFilter(resultsArray,{school: vm.school._id});
          },function(error){
              
          });
      }
      
      function refreshSchoolSubjects(){
          var schoolSubjectsPromise = SchoolsubjectsService.query().$promise;
          schoolSubjectsPromise.then(function(results){
              vm.subjects = filterFilter(results,{school:vm.school._id});
          },function(err){
              // if there has been an error
          });
      }
      
      //refresh Listings for the loading of the view
      vm.refreshStudents();
      vm.refreshTeachers();
      vm.refreshSchoolClasses();
      vm.refreshSchoolEvents();
      vm.refreshSchoolSubjects();
    // Remove existing School
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.school.$remove($state.go('schools.list'));
      }
    }
      // Remove existing Student from current School
    function removeStudent() {
      if (confirm('Are you sure you want to delete?')) {
        vm.student.$remove(/*$state.go('schools.list')*/);
          vm.refreshStudents ();
      }
    }
      
       // Remove existing Student from current School
    function removeTeacher() {
      if (confirm('Are you sure you want to delete?')) {
        vm.teacher.$remove(/*$state.go('schools.list')*/);
          vm.refreshTeachers();
      }
    }

    function removeSchoolClass(){
          if(confirm('Are you sure that you want to delete?')){
          vm.schoolclass.$remove();
          vm.refreshSchoolClasses();    
          }
          
      }
    
      function removeSchoolEvent(){
          if(confirm('Are you sure you want to delete?')){
              vm.schoolevent.$remove();
              vm.refreshSchooEvents();
              
          }
      }
      
    function removeSchoolSubject(){
        if(confirm('Are you sure you want to delete?')){
            vm.subject.$remove();
            vm.refreshSchoolSubjects();
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
        vm.createTeacher = function(size){
            vm.teacher = new TeachersService();/*{name:'',lastname:''};*/
            vm.teacher.school = vm.school._id;
            vm.openTeacherModal(size,vm.teacher);
        };

        vm.createSchoolClass = function(size){
            vm.schoolclass = new SchoolclassesService();
            vm.schoolclass.school = vm.school._id;
            vm.openSchoolClassModal(size,vm.schoolclass);
        };

      vm.createStudent = function(size){
            vm.student = new StudentsService() ;
           vm.student.school = vm.school._id;
            vm.openStudentModal(size,vm.student);
        };
      
       vm.createSchoolEvent = function(size){
            vm.schoolevent = new SchooleventsService();
           vm.schoolevent.school = vm.school._id;
            vm.openSchoolEventModal(size,vm.schoolevent);
        };
      
      vm.createSubject = function(size){
            vm.schoolsubject = new SchoolsubjectsService();
            vm.schoolsubject.school = vm.school._id;
            vm.openSubjectModal(size,vm.schoolsubject);
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

  vm.openTeacherModal = function (size,teacher) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/teachers/client/views/form-teacher.client.view.html',
      controller: 'TeachersController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          school: function(){
              return vm.school;
          },
          teacherResolve: function(){
              return vm.teacher;
          }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      //vm.selected = selectedItem;
        if(!(selectedItem._id))
            {
             
                vm.teacher.$save(function(res){
                    vm.refreshTeachers();
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

    vm.openSchoolClassModal = function (size,schoolclass) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/schoolclasses/client/views/form-schoolclass.client.view.html',
      controller: 'SchoolclassesController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          school: function(){
              return vm.school;
          },
          schoolclassResolve: function(){
              return vm.schoolclass;
          }
      }
    });

    modalInstance.result.then(function (schoolclass) {
      //vm.selected = selectedItem;
        if(!(schoolclass._id))
            {
             
                schoolclass.$save(function(res){
                
                    console.log('Record Saved');
                    vm.refreshSchoolClasses();
                },function(res){
                    vm.error = res.data.message;
                    console.log(vm.error);
                });
                
            }
        else{
            schoolclass.$update();
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
          schoolclasses: function(){
              return vm.schoolClasses;
          },
          /*student: function(){
              
           var stu =   StudentsService.query({_id: vm.student._id});
              
              return stu;
          },*/
          studentResolve: function(){
              /*var stu =   StudentsService.get({studentId: vm.student._id}).$promise;
              
              return stu;*/
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
                     vm.refreshStudents ();
                }, function(res){
                    vm.error = res.data.message;
                    console.log(vm.error);
                });
                
                 console.log(student.id);
                //vm.school.students.push(student.id);
                //vm.school.$update();
            }
        else{
             console.log(student);
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
      
      
      vm.openSubjectModal = function (size,schoolsubject) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/schoolsubjects/client/views/form-schoolsubject.client.view.html',
      controller: 'SchoolsubjectsController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          school: function(){
              return vm.school;
          },
          schoolsubjectResolve: function(){
              return vm.schoolsubject;
          }
      }
    });

    modalInstance.result.then(function (schoolsubject) {
      //vm.selected = selectedItem;
        if(!(schoolsubject._id))
            {
             
                schoolsubject.$save(function(res){
                  
                    vm.refreshSchoolSubjects();
                    console.log('Record Saved');
                },function(res){
                    vm.error = res.data.message;
                    console.log(vm.error);
                });
                //vm.school.$update();
            }
        else{
            schoolsubject.$update();
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
      templateUrl: 'modules/schoolevents/client/views/form-schoolevent.client.view.html',
      controller: 'SchooleventsController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          school: function(){
              return vm.school;
          },
          schooleventResolve: function(){
              return vm.schoolevent;
          }
      }
    });

    modalInstance.result.then(function (schoolevent) {
      //vm.selected = selectedItem;
        if(!(schoolevent._id))
            {
             
                vm.schoolevent.$save(function(){
                    console.log('Record Saved');
                    vm.refreshSchoolEvents();
                });
                //vm.schoolevent.$update();
            }
        else{
            vm.schoolevent.$update();
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

