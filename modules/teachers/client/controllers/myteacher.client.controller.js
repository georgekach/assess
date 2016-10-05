(function () {
  'use strict';

  // Teachers controller
  angular
    .module('teachers')
    .controller('MyTeacherController', MyTeacherController);

  MyTeacherController.$inject = ['$scope', '$state', 'Authentication','SchoolsService','$window','TeachersService','ClassesInSchoolService','filterFilter','$modal','ClassregistersService','RegistersForClassService','$log','ClassExercisesForClassService','ClassexercisesService','AnnouncementsForTeacherService','AnnouncementsService','MediaResourcesForTeacherService','MediaresourcesService'];

  function MyTeacherController ($scope, $state, Authentication,SchoolsService,$window,TeachersService,ClassesInSchoolService,filterFilter,$modal,ClassregistersService,RegistersForClassService,$log,ClassExercisesForClassService,ClassexercisesService,AnnouncementsForTeacherService,AnnouncementsService,MediaResourcesForTeacherService,MediaresourcesService) {
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
    vm.refreshTeachersAnnouncements = refreshTeachersAnnouncements;
    vm.refreshTeachersMediaResources = refreshTeachersMediaResources;
      
      vm.refreshTeachersAnnouncements();
      vm.refreshTeachersMediaResources();
      
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
      
      function refreshTeachersAnnouncements(){
          var teachersAnnouncementsPromise = AnnouncementsForTeacherService.query({origionatorId:vm.authentication.user.teacher}).$promise;
          
          teachersAnnouncementsPromise.then(function(data){
             if(data){
                 vm.teachersAnnouncements = data;
             } 
          },function(err){
              
          });
      }
      
      function refreshTeachersMediaResources(){
          var teachersMediaResourcesPromise = MediaResourcesForTeacherService.query({mendiaresourceTeacherId:vm.authentication.user.teacher}).$promise;
          
          teachersMediaResourcesPromise.then(function(data){
              
              vm.teachersResources = data;
              
          }, function(error){
              
          });
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
      
      
      vm.createAnnouncement = function(size){
            vm.announcement = new AnnouncementsService();
            vm.announcement.originator = vm.authentication.user.teacher;
            //vm.selectedClass.
            vm.openAnnouncementModal(size,vm.announcement);
        };
      
      vm.createMediaResource = function(size){
            vm.mediaresource = new MediaresourcesService();
            vm.mediaresource.teacher = vm.authentication.user.teacher;
            //vm.selectedClass.
            vm.openMediaResourceModal(size,vm.mediaresource);
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
      
  
      vm.openAnnouncementModal = function (size,announcement) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/announcements/client/views/form-announcement.client.view.html',
      controller: 'AnnouncementsController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          
          announcementResolve: function(){
              return announcement;//vm.announcement;
          }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      vm.announcement = selectedItem;
        if(!(selectedItem._id))
            {
             
                vm.announcement.$save(function(res){
                    vm.refreshTeachersAnnouncements();
                },function(res){
                    vm.error = res.data.message;
                    console.log(vm.error);
                });
                
                /*(selectedItem);
                vm.school.$update();*/
            }
        else{
             //vm.teacher.$update();
        }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
      
      //openMediaResourceModal
            vm.openMediaResourceModal = function (size,mediaresource) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/mediaresources/client/views/form-mediaresource.client.view.html',
      controller: 'MediaresourcesController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          
          mediaresourceResolve: function(){
              return mediaresource;//vm.announcement;
          }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      vm.mediaResource = selectedItem;
        if(!(selectedItem._id))
            {
             
                vm.mediaResource.$save(function(res){
                    vm.refreshTeachersMediaResources();
                },function(res){
                    vm.error = res.data.message;
                    console.log(vm.error);
                });
                
                /*(selectedItem);
                vm.school.$update();*/
            }
        else{
             //vm.teacher.$update();
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

      function removeAnnouncement(announcement) {
      if (confirm('Are you sure you want to delete?')) {
          
           AnnouncementsService.get({announcementId: announcement._id},function(announcementToDelete){
              
              announcementToDelete.$remove(function(){
              console.log('Deleted Announcement');
          });
              
          });
          
          
          
        //vm.teacher.$remove($state.go('teachers.list'));
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
