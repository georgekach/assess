// Mediaresources service used to communicate Mediaresources REST endpoints
(function () {
  'use strict';

  angular
    .module('mediaresources')
    .factory('MediaResourcesForTeacherService', MediaResourcesForTeacherService);

  MediaResourcesForTeacherService.$inject = ['$resource'];

  function MediaResourcesForTeacherService($resource) {
    return $resource('api/mediarecourcesforteacher/:mendiaresourceTeacherId', {
      mendiaresourceTeacherId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
        query:{
            method: 'GET',
            isArray: true
        }
    });
  }
}());
