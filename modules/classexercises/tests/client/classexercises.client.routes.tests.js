(function () {
  'use strict';

  describe('Classexercises Route Tests', function () {
    // Initialize global variables
    var $scope,
      ClassexercisesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ClassexercisesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ClassexercisesService = _ClassexercisesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('classexercises');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/classexercises');
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
          ClassexercisesController,
          mockClassexercise;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('classexercises.view');
          $templateCache.put('modules/classexercises/client/views/view-classexercise.client.view.html', '');

          // create mock Classexercise
          mockClassexercise = new ClassexercisesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Classexercise Name'
          });

          // Initialize Controller
          ClassexercisesController = $controller('ClassexercisesController as vm', {
            $scope: $scope,
            classexerciseResolve: mockClassexercise
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:classexerciseId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.classexerciseResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            classexerciseId: 1
          })).toEqual('/classexercises/1');
        }));

        it('should attach an Classexercise to the controller scope', function () {
          expect($scope.vm.classexercise._id).toBe(mockClassexercise._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/classexercises/client/views/view-classexercise.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ClassexercisesController,
          mockClassexercise;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('classexercises.create');
          $templateCache.put('modules/classexercises/client/views/form-classexercise.client.view.html', '');

          // create mock Classexercise
          mockClassexercise = new ClassexercisesService();

          // Initialize Controller
          ClassexercisesController = $controller('ClassexercisesController as vm', {
            $scope: $scope,
            classexerciseResolve: mockClassexercise
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.classexerciseResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/classexercises/create');
        }));

        it('should attach an Classexercise to the controller scope', function () {
          expect($scope.vm.classexercise._id).toBe(mockClassexercise._id);
          expect($scope.vm.classexercise._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/classexercises/client/views/form-classexercise.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ClassexercisesController,
          mockClassexercise;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('classexercises.edit');
          $templateCache.put('modules/classexercises/client/views/form-classexercise.client.view.html', '');

          // create mock Classexercise
          mockClassexercise = new ClassexercisesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Classexercise Name'
          });

          // Initialize Controller
          ClassexercisesController = $controller('ClassexercisesController as vm', {
            $scope: $scope,
            classexerciseResolve: mockClassexercise
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:classexerciseId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.classexerciseResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            classexerciseId: 1
          })).toEqual('/classexercises/1/edit');
        }));

        it('should attach an Classexercise to the controller scope', function () {
          expect($scope.vm.classexercise._id).toBe(mockClassexercise._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/classexercises/client/views/form-classexercise.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
