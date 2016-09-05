(function () {
  'use strict';

  describe('Schoolterms Route Tests', function () {
    // Initialize global variables
    var $scope,
      SchooltermsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SchooltermsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SchooltermsService = _SchooltermsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('schoolterms');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/schoolterms');
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
          SchooltermsController,
          mockSchoolterm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('schoolterms.view');
          $templateCache.put('modules/schoolterms/client/views/view-schoolterm.client.view.html', '');

          // create mock Schoolterm
          mockSchoolterm = new SchooltermsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Schoolterm Name'
          });

          //Initialize Controller
          SchooltermsController = $controller('SchooltermsController as vm', {
            $scope: $scope,
            schooltermResolve: mockSchoolterm
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:schooltermId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.schooltermResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            schooltermId: 1
          })).toEqual('/schoolterms/1');
        }));

        it('should attach an Schoolterm to the controller scope', function () {
          expect($scope.vm.schoolterm._id).toBe(mockSchoolterm._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/schoolterms/client/views/view-schoolterm.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SchooltermsController,
          mockSchoolterm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('schoolterms.create');
          $templateCache.put('modules/schoolterms/client/views/form-schoolterm.client.view.html', '');

          // create mock Schoolterm
          mockSchoolterm = new SchooltermsService();

          //Initialize Controller
          SchooltermsController = $controller('SchooltermsController as vm', {
            $scope: $scope,
            schooltermResolve: mockSchoolterm
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.schooltermResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/schoolterms/create');
        }));

        it('should attach an Schoolterm to the controller scope', function () {
          expect($scope.vm.schoolterm._id).toBe(mockSchoolterm._id);
          expect($scope.vm.schoolterm._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/schoolterms/client/views/form-schoolterm.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SchooltermsController,
          mockSchoolterm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('schoolterms.edit');
          $templateCache.put('modules/schoolterms/client/views/form-schoolterm.client.view.html', '');

          // create mock Schoolterm
          mockSchoolterm = new SchooltermsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Schoolterm Name'
          });

          //Initialize Controller
          SchooltermsController = $controller('SchooltermsController as vm', {
            $scope: $scope,
            schooltermResolve: mockSchoolterm
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:schooltermId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.schooltermResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            schooltermId: 1
          })).toEqual('/schoolterms/1/edit');
        }));

        it('should attach an Schoolterm to the controller scope', function () {
          expect($scope.vm.schoolterm._id).toBe(mockSchoolterm._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/schoolterms/client/views/form-schoolterm.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
