'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication','Menus',
  function ($scope, Authentication,Menus) {
    // This provides Authentication context.
    $scope.authentication = Authentication;


    $scope.toggleMenu = function(){
      $scope.menus = Menus.getMenu('topbar');
      /*$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
      */
      //alert('You requested Toggle.');

      var e = angular.element(document.querySelector('#wrapper'));
      e.toggleClass('toggled');
    };


  }
]);
