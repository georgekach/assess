(function () {
  'use strict';

  angular
    .module('teachers')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    /*Menus.addMenuItem('topbar', {
      title: 'Teachers',
      state: 'teachers',
      type: 'dropdown',
      roles: ['*']
    });

      
    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'teachers', {
      title: 'List Teachers',
      state: 'teachers.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'teachers', {
      title: 'Create Teacher',
      state: 'teachers.create',
      roles: ['user']
    });*/
      
      Menus.addMenuItem('sidebar', {
      title: 'Teacher',
      state: 'teacher.view',
      roles: ['*']
    });
  }
})();
