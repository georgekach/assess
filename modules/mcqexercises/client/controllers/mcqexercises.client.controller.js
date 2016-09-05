(function () {
  'use strict';

  // Mcqexercises controller
  angular
    .module('mcqexercises')
    .controller('McqexercisesController', McqexercisesController);

  McqexercisesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'mcqexerciseResolve','$modal','$log'];

  function McqexercisesController ($scope, $state, $window, Authentication, mcqexercise,$modal,$log) {
    var vm = this;

    vm.authentication = Authentication;
    vm.mcqexercise = mcqexercise;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Mcqexercise
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.mcqexercise.$remove($state.go('mcqexercises.list'));
      }
    }

    // Save Mcqexercise
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.mcqexerciseForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.mcqexercise._id) {
        vm.mcqexercise.$update(successCallback, errorCallback);
      } else {
        vm.mcqexercise.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('mcqexercises.view', {
          mcqexerciseId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
      
      vm.createQuestion = function(size){
            vm.question = {};
            vm.openQuestionModal(size,vm.question);
        };
      
      // open modal for editing questions
      vm.openQuestionModal = function (size,question) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/mcqexercises/client/views/modal-question.client.view.html',
      controller: 'McqModalController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          mcqexercise: function(){
              return vm.mcqexercise;
          },
          question: function(){
              return vm.question;
          }
      }
    });

    modalInstance.result.then(function (question) {
      //vm.selected = selectedItem;
        if(!(question._id))
            {
             
                vm.mcqexercise.questions.push(question);
                vm.mcqexercise.$update();
            }
        else{
            vm.mcqexercise.$update();
        }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
      
            //confirm delete
      vm.confirmDeleteQuestion = function (size,question) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/mcqexercises/client/views/modal-dialog-mcqexercise.client.view.html',
      controller: 'ConfirmDeleteMcqController',
      controllerAs: 'vm',
      size: size,
      resolve: {    
          mcqexercise: function(){
              return vm.mcqexercise;
          },
          question: function(){
              return vm.question;
          }
      }
    });

    modalInstance.result.then(function (question) {
      
        vm.removeByAttr(vm.mcqexercise.questions,'_id',question._id);
         vm.mcqexercise.$update();
        
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
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
  }
}());
