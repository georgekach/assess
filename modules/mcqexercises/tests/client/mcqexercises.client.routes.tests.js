(function () {
  'use strict';

  describe('Mcqexercises Route Tests', function () {
    // Initialize global variables
    var $scope,
      McqexercisesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _McqexercisesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      McqexercisesService = _McqexercisesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('mcqexercises');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/mcqexercises');
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
          McqexercisesController,
          mockMcqexercise;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('mcqexercises.view');
          $templateCache.put('modules/mcqexercises/client/views/view-mcqexercise.client.view.html', '');

          // create mock Mcqexercise
          mockMcqexercise = new McqexercisesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Mcqexercise Name'
          });

          // Initialize Controller
          McqexercisesController = $controller('McqexercisesController as vm', {
            $scope: $scope,
            mcqexerciseResolve: mockMcqexercise
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:mcqexerciseId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.mcqexerciseResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            mcqexerciseId: 1
          })).toEqual('/mcqexercises/1');
        }));

        it('should attach an Mcqexercise to the controller scope', function () {
          expect($scope.vm.mcqexercise._id).toBe(mockMcqexercise._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/mcqexercises/client/views/view-mcqexercise.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          McqexercisesController,
          mockMcqexercise;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('mcqexercises.create');
          $templateCache.put('modules/mcqexercises/client/views/form-mcqexercise.client.view.html', '');

          // create mock Mcqexercise
          mockMcqexercise = new McqexercisesService();

          // Initialize Controller
          McqexercisesController = $controller('McqexercisesController as vm', {
            $scope: $scope,
            mcqexerciseResolve: mockMcqexercise
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.mcqexerciseResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/mcqexercises/create');
        }));

        it('should attach an Mcqexercise to the controller scope', function () {
          expect($scope.vm.mcqexercise._id).toBe(mockMcqexercise._id);
          expect($scope.vm.mcqexercise._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/mcqexercises/client/views/form-mcqexercise.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          McqexercisesController,
          mockMcqexercise;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('mcqexercises.edit');
          $templateCache.put('modules/mcqexercises/client/views/form-mcqexercise.client.view.html', '');

          // create mock Mcqexercise
          mockMcqexercise = new McqexercisesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Mcqexercise Name'
          });

          // Initialize Controller
          McqexercisesController = $controller('McqexercisesController as vm', {
            $scope: $scope,
            mcqexerciseResolve: mockMcqexercise
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:mcqexerciseId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.mcqexerciseResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            mcqexerciseId: 1
          })).toEqual('/mcqexercises/1/edit');
        }));

        it('should attach an Mcqexercise to the controller scope', function () {
          expect($scope.vm.mcqexercise._id).toBe(mockMcqexercise._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/mcqexercises/client/views/form-mcqexercise.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
