(function () {
  'use strict';

  describe('Announcements Route Tests', function () {
    // Initialize global variables
    var $scope,
      AnnouncementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AnnouncementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AnnouncementsService = _AnnouncementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('announcements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/announcements');
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
          AnnouncementsController,
          mockAnnouncement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('announcements.view');
          $templateCache.put('modules/announcements/client/views/view-announcement.client.view.html', '');

          // create mock Announcement
          mockAnnouncement = new AnnouncementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Announcement Name'
          });

          // Initialize Controller
          AnnouncementsController = $controller('AnnouncementsController as vm', {
            $scope: $scope,
            announcementResolve: mockAnnouncement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:announcementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.announcementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            announcementId: 1
          })).toEqual('/announcements/1');
        }));

        it('should attach an Announcement to the controller scope', function () {
          expect($scope.vm.announcement._id).toBe(mockAnnouncement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/announcements/client/views/view-announcement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AnnouncementsController,
          mockAnnouncement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('announcements.create');
          $templateCache.put('modules/announcements/client/views/form-announcement.client.view.html', '');

          // create mock Announcement
          mockAnnouncement = new AnnouncementsService();

          // Initialize Controller
          AnnouncementsController = $controller('AnnouncementsController as vm', {
            $scope: $scope,
            announcementResolve: mockAnnouncement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.announcementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/announcements/create');
        }));

        it('should attach an Announcement to the controller scope', function () {
          expect($scope.vm.announcement._id).toBe(mockAnnouncement._id);
          expect($scope.vm.announcement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/announcements/client/views/form-announcement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AnnouncementsController,
          mockAnnouncement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('announcements.edit');
          $templateCache.put('modules/announcements/client/views/form-announcement.client.view.html', '');

          // create mock Announcement
          mockAnnouncement = new AnnouncementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Announcement Name'
          });

          // Initialize Controller
          AnnouncementsController = $controller('AnnouncementsController as vm', {
            $scope: $scope,
            announcementResolve: mockAnnouncement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:announcementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.announcementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            announcementId: 1
          })).toEqual('/announcements/1/edit');
        }));

        it('should attach an Announcement to the controller scope', function () {
          expect($scope.vm.announcement._id).toBe(mockAnnouncement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/announcements/client/views/form-announcement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
