(function () {
  'use strict';

  angular
    .module('schoolevents')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
   /* menuService.addMenuItem('topbar', {
      title: 'Schoolevents',
      state: 'schoolevents',
      type: 'dropdown',
      roles: ['*']
    });*/

    // Add the dropdown list item
    /*menuService.addSubMenuItem('topbar', 'schoolevents', {
      title: 'List Schoolevents',
      state: 'schoolevents.list'
    });*/

    // Add the dropdown create item
    /*menuService.addSubMenuItem('topbar', 'schoolevents', {
      title: 'Create Schoolevent',
      state: 'schoolevents.create',
      roles: ['user']
    });*/
  }
}());
