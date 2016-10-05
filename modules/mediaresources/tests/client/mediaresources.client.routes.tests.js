(function () {
  'use strict';

  describe('Mediaresources Route Tests', function () {
    // Initialize global variables
    var $scope,
      MediaresourcesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _MediaresourcesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      MediaresourcesService = _MediaresourcesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('mediaresources');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/mediaresources');
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
          MediaresourcesController,
          mockMediaresource;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('mediaresources.view');
          $templateCache.put('modules/mediaresources/client/views/view-mediaresource.client.view.html', '');

          // create mock Mediaresource
          mockMediaresource = new MediaresourcesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Mediaresource Name'
          });

          // Initialize Controller
          MediaresourcesController = $controller('MediaresourcesController as vm', {
            $scope: $scope,
            mediaresourceResolve: mockMediaresource
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:mediaresourceId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.mediaresourceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            mediaresourceId: 1
          })).toEqual('/mediaresources/1');
        }));

        it('should attach an Mediaresource to the controller scope', function () {
          expect($scope.vm.mediaresource._id).toBe(mockMediaresource._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/mediaresources/client/views/view-mediaresource.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          MediaresourcesController,
          mockMediaresource;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('mediaresources.create');
          $templateCache.put('modules/mediaresources/client/views/form-mediaresource.client.view.html', '');

          // create mock Mediaresource
          mockMediaresource = new MediaresourcesService();

          // Initialize Controller
          MediaresourcesController = $controller('MediaresourcesController as vm', {
            $scope: $scope,
            mediaresourceResolve: mockMediaresource
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.mediaresourceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/mediaresources/create');
        }));

        it('should attach an Mediaresource to the controller scope', function () {
          expect($scope.vm.mediaresource._id).toBe(mockMediaresource._id);
          expect($scope.vm.mediaresource._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/mediaresources/client/views/form-mediaresource.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          MediaresourcesController,
          mockMediaresource;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('mediaresources.edit');
          $templateCache.put('modules/mediaresources/client/views/form-mediaresource.client.view.html', '');

          // create mock Mediaresource
          mockMediaresource = new MediaresourcesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Mediaresource Name'
          });

          // Initialize Controller
          MediaresourcesController = $controller('MediaresourcesController as vm', {
            $scope: $scope,
            mediaresourceResolve: mockMediaresource
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:mediaresourceId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.mediaresourceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            mediaresourceId: 1
          })).toEqual('/mediaresources/1/edit');
        }));

        it('should attach an Mediaresource to the controller scope', function () {
          expect($scope.vm.mediaresource._id).toBe(mockMediaresource._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/mediaresources/client/views/form-mediaresource.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
