/**
 * Created by George on 7/14/2016.
 */
'use strict';

angular.module('core').controller('SidebarController', ['$scope', 'Authentication','Menus',
    function ($scope, Authentication,Menus) {
        
    $scope.authentication = Authentication;

/*
    $scope.toggleMenu = function(){
      //$scope.menus = Menus.getMenu('topbar');
     var e = angular.element(document.querySelector('#wrapper'));
      e.toggleClass('toggled');
      var f = angular.element(document.querySelector('#toggleMenuButton'));
      f.toggleClass('is-active');
    };*/
     // var data = {menuname: 'sidebar',items: [{title:'Chat'},{title:'Second'}]};
      $scope.menus = Menus.getMenu('sidebar');
    }
]);
