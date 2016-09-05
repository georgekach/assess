(function () {
  'use strict';

  describe('Schoolclasses Route Tests', function () {
    // Initialize global variables
    var $scope,
      SchoolclassesService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SchoolclassesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SchoolclassesService = _SchoolclassesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('schoolclasses');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/schoolclasses');
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
          SchoolclassesController,
          mockSchoolclass;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('schoolclasses.view');
          $templateCache.put('modules/schoolclasses/client/views/view-schoolclass.client.view.html', '');

          // create mock Schoolclass
          mockSchoolclass = new SchoolclassesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Schoolclass Name'
          });

          //Initialize Controller
          SchoolclassesController = $controller('SchoolclassesController as vm', {
            $scope: $scope,
            schoolclassResolve: mockSchoolclass
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:schoolclassId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.schoolclassResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            schoolclassId: 1
          })).toEqual('/schoolclasses/1');
        }));

        it('should attach an Schoolclass to the controller scope', function () {
          expect($scope.vm.schoolclass._id).toBe(mockSchoolclass._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/schoolclasses/client/views/view-schoolclass.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SchoolclassesController,
          mockSchoolclass;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('schoolclasses.create');
          $templateCache.put('modules/schoolclasses/client/views/form-schoolclass.client.view.html', '');

          // create mock Schoolclass
          mockSchoolclass = new SchoolclassesService();

          //Initialize Controller
          SchoolclassesController = $controller('SchoolclassesController as vm', {
            $scope: $scope,
            schoolclassResolve: mockSchoolclass
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.schoolclassResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/schoolclasses/create');
        }));

        it('should attach an Schoolclass to the controller scope', function () {
          expect($scope.vm.schoolclass._id).toBe(mockSchoolclass._id);
          expect($scope.vm.schoolclass._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/schoolclasses/client/views/form-schoolclass.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SchoolclassesController,
          mockSchoolclass;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('schoolclasses.edit');
          $templateCache.put('modules/schoolclasses/client/views/form-schoolclass.client.view.html', '');

          // create mock Schoolclass
          mockSchoolclass = new SchoolclassesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Schoolclass Name'
          });

          //Initialize Controller
          SchoolclassesController = $controller('SchoolclassesController as vm', {
            $scope: $scope,
            schoolclassResolve: mockSchoolclass
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:schoolclassId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.schoolclassResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            schoolclassId: 1
          })).toEqual('/schoolclasses/1/edit');
        }));

        it('should attach an Schoolclass to the controller scope', function () {
          expect($scope.vm.schoolclass._id).toBe(mockSchoolclass._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/schoolclasses/client/views/form-schoolclass.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
