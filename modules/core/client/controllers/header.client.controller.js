'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus',
  function ($scope, $state, Authentication, Menus) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

      $scope.toggleMenu = function(){
      //$scope.menus = Menus.getMenu('topbar');
     var e = angular.element(document.querySelector('#wrapper'));
      e.toggleClass('toggled');
      var f = angular.element(document.querySelector('#toggleMenuButton'));
      f.toggleClass('is-active');
    };
      
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);
