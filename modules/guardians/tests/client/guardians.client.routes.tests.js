(function () {
  'use strict';

  describe('Guardians Route Tests', function () {
    // Initialize global variables
    var $scope,
      GuardiansService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _GuardiansService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      GuardiansService = _GuardiansService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('guardians');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/guardians');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          GuardiansController,
          mockGuardian;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('guardians.view');
          $templateCache.put('modules/guardians/client/views/view-guardian.client.view.html', '');

          // create mock Guardian
          mockGuardian = new GuardiansService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Guardian Name'
          });

          //Initialize Controller
          GuardiansController = $controller('GuardiansController as vm', {
            $scope: $scope,
            guardianResolve: mockGuardian
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:guardianId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.guardianResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            guardianId: 1
          })).toEqual('/guardians/1');
        }));

        it('should attach an Guardian to the controller scope', function () {
          expect($scope.vm.guardian._id).toBe(mockGuardian._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/guardians/client/views/view-guardian.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          GuardiansController,
          mockGuardian;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('guardians.create');
          $templateCache.put('modules/guardians/client/views/form-guardian.client.view.html', '');

          // create mock Guardian
          mockGuardian = new GuardiansService();

          //Initialize Controller
          GuardiansController = $controller('GuardiansController as vm', {
            $scope: $scope,
            guardianResolve: mockGuardian
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.guardianResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/guardians/create');
        }));

        it('should attach an Guardian to the controller scope', function () {
          expect($scope.vm.guardian._id).toBe(mockGuardian._id);
          expect($scope.vm.guardian._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/guardians/client/views/form-guardian.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          GuardiansController,
          mockGuardian;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('guardians.edit');
          $templateCache.put('modules/guardians/client/views/form-guardian.client.view.html', '');

          // create mock Guardian
          mockGuardian = new GuardiansService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Guardian Name'
          });

          //Initialize Controller
          GuardiansController = $controller('GuardiansController as vm', {
            $scope: $scope,
            guardianResolve: mockGuardian
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:guardianId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.guardianResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            guardianId: 1
          })).toEqual('/guardians/1/edit');
        }));

        it('should attach an Guardian to the controller scope', function () {
          expect($scope.vm.guardian._id).toBe(mockGuardian._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/guardians/client/views/form-guardian.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
