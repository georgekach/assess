(function () {
  'use strict';

  describe('Classregisters Route Tests', function () {
    // Initialize global variables
    var $scope,
      ClassregistersService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ClassregistersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ClassregistersService = _ClassregistersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('classregisters');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/classregisters');
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
          ClassregistersController,
          mockClassregister;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('classregisters.view');
          $templateCache.put('modules/classregisters/client/views/view-classregister.client.view.html', '');

          // create mock Classregister
          mockClassregister = new ClassregistersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Classregister Name'
          });

          //Initialize Controller
          ClassregistersController = $controller('ClassregistersController as vm', {
            $scope: $scope,
            classregisterResolve: mockClassregister
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:classregisterId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.classregisterResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            classregisterId: 1
          })).toEqual('/classregisters/1');
        }));

        it('should attach an Classregister to the controller scope', function () {
          expect($scope.vm.classregister._id).toBe(mockClassregister._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/classregisters/client/views/view-classregister.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ClassregistersController,
          mockClassregister;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('classregisters.create');
          $templateCache.put('modules/classregisters/client/views/form-classregister.client.view.html', '');

          // create mock Classregister
          mockClassregister = new ClassregistersService();

          //Initialize Controller
          ClassregistersController = $controller('ClassregistersController as vm', {
            $scope: $scope,
            classregisterResolve: mockClassregister
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.classregisterResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/classregisters/create');
        }));

        it('should attach an Classregister to the controller scope', function () {
          expect($scope.vm.classregister._id).toBe(mockClassregister._id);
          expect($scope.vm.classregister._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/classregisters/client/views/form-classregister.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ClassregistersController,
          mockClassregister;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('classregisters.edit');
          $templateCache.put('modules/classregisters/client/views/form-classregister.client.view.html', '');

          // create mock Classregister
          mockClassregister = new ClassregistersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Classregister Name'
          });

          //Initialize Controller
          ClassregistersController = $controller('ClassregistersController as vm', {
            $scope: $scope,
            classregisterResolve: mockClassregister
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:classregisterId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.classregisterResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            classregisterId: 1
          })).toEqual('/classregisters/1/edit');
        }));

        it('should attach an Classregister to the controller scope', function () {
          expect($scope.vm.classregister._id).toBe(mockClassregister._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/classregisters/client/views/form-classregister.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
