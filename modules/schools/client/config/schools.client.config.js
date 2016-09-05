(function () {
  'use strict';

  angular
    .module('schools')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
   /* Menus.addMenuItem('topbar', {
      title: 'Schools',
      state: 'schools',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'schools', {
      title: 'List Schools',
      state: 'schools.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'schools', {
      title: 'Create School',
      state: 'schools.create',
      roles: ['user']
    });*/
    Menus.addMenuItem('sidebar',{
      title: 'Schools',
      state: 'schools',
      type: 'dropdown',
      roles: ['*']
    });
    Menus.addSubMenuItem('sidebar', 'schools', {
      title: 'List',
      state: 'schools.list'
    });
    Menus.addSubMenuItem('sidebar', 'schools', {
      title: 'create',
      state: 'schools.create',
      roles: ['user']
    });

      Menus.addMenuItem('sidebar',{
          title:'School Admin',
          state:'schooladmin.view',
          roles:['*']
      });
  }
})();
