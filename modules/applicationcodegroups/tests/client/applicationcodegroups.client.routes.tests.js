(function () {
  'use strict';

  describe('Applicationcodegroups Route Tests', function () {
    // Initialize global variables
    var $scope,
      ApplicationcodegroupsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ApplicationcodegroupsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ApplicationcodegroupsService = _ApplicationcodegroupsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('applicationcodegroups');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/applicationcodegroups');
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
          ApplicationcodegroupsController,
          mockApplicationcodegroup;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('applicationcodegroups.view');
          $templateCache.put('modules/applicationcodegroups/client/views/view-applicationcodegroup.client.view.html', '');

          // create mock Applicationcodegroup
          mockApplicationcodegroup = new ApplicationcodegroupsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Applicationcodegroup Name'
          });

          // Initialize Controller
          ApplicationcodegroupsController = $controller('ApplicationcodegroupsController as vm', {
            $scope: $scope,
            applicationcodegroupResolve: mockApplicationcodegroup
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:applicationcodegroupId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.applicationcodegroupResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            applicationcodegroupId: 1
          })).toEqual('/applicationcodegroups/1');
        }));

        it('should attach an Applicationcodegroup to the controller scope', function () {
          expect($scope.vm.applicationcodegroup._id).toBe(mockApplicationcodegroup._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/applicationcodegroups/client/views/view-applicationcodegroup.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ApplicationcodegroupsController,
          mockApplicationcodegroup;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('applicationcodegroups.create');
          $templateCache.put('modules/applicationcodegroups/client/views/form-applicationcodegroup.client.view.html', '');

          // create mock Applicationcodegroup
          mockApplicationcodegroup = new ApplicationcodegroupsService();

          // Initialize Controller
          ApplicationcodegroupsController = $controller('ApplicationcodegroupsController as vm', {
            $scope: $scope,
            applicationcodegroupResolve: mockApplicationcodegroup
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.applicationcodegroupResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/applicationcodegroups/create');
        }));

        it('should attach an Applicationcodegroup to the controller scope', function () {
          expect($scope.vm.applicationcodegroup._id).toBe(mockApplicationcodegroup._id);
          expect($scope.vm.applicationcodegroup._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/applicationcodegroups/client/views/form-applicationcodegroup.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ApplicationcodegroupsController,
          mockApplicationcodegroup;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('applicationcodegroups.edit');
          $templateCache.put('modules/applicationcodegroups/client/views/form-applicationcodegroup.client.view.html', '');

          // create mock Applicationcodegroup
          mockApplicationcodegroup = new ApplicationcodegroupsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Applicationcodegroup Name'
          });

          // Initialize Controller
          ApplicationcodegroupsController = $controller('ApplicationcodegroupsController as vm', {
            $scope: $scope,
            applicationcodegroupResolve: mockApplicationcodegroup
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:applicationcodegroupId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.applicationcodegroupResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            applicationcodegroupId: 1
          })).toEqual('/applicationcodegroups/1/edit');
        }));

        it('should attach an Applicationcodegroup to the controller scope', function () {
          expect($scope.vm.applicationcodegroup._id).toBe(mockApplicationcodegroup._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/applicationcodegroups/client/views/form-applicationcodegroup.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
