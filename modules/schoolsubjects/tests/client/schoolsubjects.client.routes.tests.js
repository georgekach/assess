(function () {
  'use strict';

  describe('Schoolsubjects Route Tests', function () {
    // Initialize global variables
    var $scope,
      SchoolsubjectsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SchoolsubjectsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SchoolsubjectsService = _SchoolsubjectsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('schoolsubjects');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/schoolsubjects');
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
          SchoolsubjectsController,
          mockSchoolsubject;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('schoolsubjects.view');
          $templateCache.put('modules/schoolsubjects/client/views/view-schoolsubject.client.view.html', '');

          // create mock Schoolsubject
          mockSchoolsubject = new SchoolsubjectsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Schoolsubject Name'
          });

          // Initialize Controller
          SchoolsubjectsController = $controller('SchoolsubjectsController as vm', {
            $scope: $scope,
            schoolsubjectResolve: mockSchoolsubject
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:schoolsubjectId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.schoolsubjectResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            schoolsubjectId: 1
          })).toEqual('/schoolsubjects/1');
        }));

        it('should attach an Schoolsubject to the controller scope', function () {
          expect($scope.vm.schoolsubject._id).toBe(mockSchoolsubject._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/schoolsubjects/client/views/view-schoolsubject.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SchoolsubjectsController,
          mockSchoolsubject;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('schoolsubjects.create');
          $templateCache.put('modules/schoolsubjects/client/views/form-schoolsubject.client.view.html', '');

          // create mock Schoolsubject
          mockSchoolsubject = new SchoolsubjectsService();

          // Initialize Controller
          SchoolsubjectsController = $controller('SchoolsubjectsController as vm', {
            $scope: $scope,
            schoolsubjectResolve: mockSchoolsubject
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.schoolsubjectResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/schoolsubjects/create');
        }));

        it('should attach an Schoolsubject to the controller scope', function () {
          expect($scope.vm.schoolsubject._id).toBe(mockSchoolsubject._id);
          expect($scope.vm.schoolsubject._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/schoolsubjects/client/views/form-schoolsubject.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SchoolsubjectsController,
          mockSchoolsubject;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('schoolsubjects.edit');
          $templateCache.put('modules/schoolsubjects/client/views/form-schoolsubject.client.view.html', '');

          // create mock Schoolsubject
          mockSchoolsubject = new SchoolsubjectsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Schoolsubject Name'
          });

          // Initialize Controller
          SchoolsubjectsController = $controller('SchoolsubjectsController as vm', {
            $scope: $scope,
            schoolsubjectResolve: mockSchoolsubject
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:schoolsubjectId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.schoolsubjectResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            schoolsubjectId: 1
          })).toEqual('/schoolsubjects/1/edit');
        }));

        it('should attach an Schoolsubject to the controller scope', function () {
          expect($scope.vm.schoolsubject._id).toBe(mockSchoolsubject._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/schoolsubjects/client/views/form-schoolsubject.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
