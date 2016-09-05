(function () {
  'use strict';

  angular
    .module('guardians')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    /*Menus.addMenuItem('topbar', {
      title: 'Guardians',
      state: 'guardians',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'guardians', {
      title: 'List Guardians',
      state: 'guardians.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'guardians', {
      title: 'Create Guardian',
      state: 'guardians.create',
      roles: ['user']
    });*/

    Menus.addMenuItem('sidebar', {
      title: 'Guardians',
      state: 'guardians',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('sidebar', 'guardians', {
      title: 'list',
      state: 'guardians.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('sidebar', 'guardians', {
      title: 'create',
      state: 'guardians.create',
      roles: ['user']
    });
      
      Menus.addMenuItem('sidebar', {
      title: 'My Guardian',
      state: 'guardian.view',
      roles: ['*']
    });
  }
})();
