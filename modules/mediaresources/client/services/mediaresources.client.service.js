// Mediaresources service used to communicate Mediaresources REST endpoints
(function () {
  'use strict';

  angular
    .module('mediaresources')
    .factory('MediaresourcesService', MediaresourcesService);

  MediaresourcesService.$inject = ['$resource'];

  function MediaresourcesService($resource) {
    return $resource('api/mediaresources/:mediaresourceId', {
      mediaresourceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
