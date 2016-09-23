(function () {
  'use strict';

  angular
    .module('schoolsubjects')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
/*    menuService.addMenuItem('topbar', {
      title: 'Schoolsubjects',
      state: 'schoolsubjects',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'schoolsubjects', {
      title: 'List Schoolsubjects',
      state: 'schoolsubjects.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'schoolsubjects', {
      title: 'Create Schoolsubject',
      state: 'schoolsubjects.create',
      roles: ['user']
    });*/
  }
}());
