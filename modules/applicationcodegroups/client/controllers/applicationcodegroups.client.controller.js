(function () {
  'use strict';

  // Applicationcodegroups controller
  angular
    .module('applicationcodegroups')
    .controller('ApplicationcodegroupsController', ApplicationcodegroupsController);

  ApplicationcodegroupsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'applicationcodegroupResolve','$modal','$log'];

  function ApplicationcodegroupsController ($scope, $state, $window, Authentication, applicationcodegroup,$modal,$log) {
    var vm = this;

    vm.authentication = Authentication;
    vm.applicationcodegroup = applicationcodegroup;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

       vm.animationsEnabled = true;
      
       vm.toggleAnimation = function () {
    vm.animationsEnabled = !vm.animationsEnabled;
  };
      
    // Remove existing Applicationcodegroup
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.applicationcodegroup.$remove($state.go('applicationcodegroups.list'));
      }
    }
      
      vm.createApplicationCode = function(size){
            vm.applicationcode = {};
            vm.openApplicationCodeModal(size,vm.applicationcode);
        };

    vm.openApplicationCodeModal = function (size,applicationcode) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/applicationcodegroups/client/views/modal-applicationcode.client.view.html',
      controller: 'ApplicationCodeModalController',
      controllerAs: 'vm',
      size: size,
      resolve: {
        /*items: function () {
          return vm.items;
        },*/
          applicationcodegroup: function(){
              return vm.applicationcodegroup;
          },
          applicationcode: function(){
              return vm.applicationcode;
          }
      }
    });

    modalInstance.result.then(function (applicationcode) {
      //vm.selected = selectedItem;
        if(!(applicationcode._id))
            {
             
                vm.applicationcodegroup.applicationcodes.push(applicationcode);
                vm.applicationcodegroup.$update();
            }
        else{
            vm.applicationcodegroup.$update();
        }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
      
         //confirmDeleteSchoolClass
            vm.confirmApplicationDeleteCode = function (size,applicationcode) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modules/applicationcodegroups/client/views/modal-applicationcode-dialog-client.view.html',
      controller: 'ConfirmApplicationDeleteCodeController',
      controllerAs: 'vm',
      size: size,
      resolve: {    
          applicationcodegroup: function(){
              return vm.applicationcodegroup;
          },
          applicationcode: function(){
              return vm.applicationcode;
          }
      }
    });

    modalInstance.result.then(function (student) {
      
        vm.removeByAttr(vm.applicationcodegroup.applicationcodes,'_id',student._id);
         vm.applicationcodegroup.$update();
        /*if(!(selectedItem._id))
            {
             
                vm.school.teachers.push(selectedItem);
                vm.school.$update();
            }*/
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };   
      
    // Save Applicationcodegroup
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.applicationcodegroupForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.applicationcodegroup._id) {
        vm.applicationcodegroup.$update(successCallback, errorCallback);
      } else {
        vm.applicationcodegroup.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('applicationcodegroups.view', {
          applicationcodegroupId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
