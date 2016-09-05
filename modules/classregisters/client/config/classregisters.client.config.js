(function () {
  'use strict';

  angular
    .module('classregisters')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Classregisters',
      state: 'classregisters',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'classregisters', {
      title: 'List Classregisters',
      state: 'classregisters.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'classregisters', {
      title: 'Create Classregister',
      state: 'classregisters.create',
      roles: ['user']
    });

    Menus.addMenuItem('sidebar',{
      title: 'Class Registers',
      state: 'classregisters',
      type: 'dropdown',
      roles: ['*']
    });
    Menus.addSubMenuItem('sidebar', 'classregisters', {
      title: 'list',
      state: 'classregisters.list'
    });
    Menus.addSubMenuItem('sidebar', 'classregisters', {
      title: 'create',
      state: 'classregisters.create',
      roles: ['user']
    });
  }
})();
