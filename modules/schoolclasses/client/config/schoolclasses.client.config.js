(function () {
  'use strict';

  angular
    .module('schoolclasses')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
      /*
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Schoolclasses',
      state: 'schoolclasses',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'schoolclasses', {
      title: 'List Schoolclasses',
      state: 'schoolclasses.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'schoolclasses', {
      title: 'Create Schoolclass',
      state: 'schoolclasses.create',
      roles: ['user']
    });
*/

    Menus.addMenuItem('sidebar', {
      title: 'Classes',
      state: 'schoolclasses',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('sidebar', 'schoolclasses', {
      title: 'list',
      state: 'schoolclasses.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('sidebar', 'schoolclasses', {
      title: 'create',
      state: 'schoolclasses.create',
      roles: ['user']
    });

  }
})();
