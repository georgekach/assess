// Applicationcodegroups service used to communicate Applicationcodegroups REST endpoints
(function () {
  'use strict';

  angular
    .module('applicationcodegroups')
    .factory('ApplicationcodegroupsService', ApplicationcodegroupsService);

  ApplicationcodegroupsService.$inject = ['$resource'];

  function ApplicationcodegroupsService($resource) {
    return $resource('api/applicationcodegroups/:applicationcodegroupId', {
      applicationcodegroupId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
