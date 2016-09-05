(function () {
  'use strict';

  angular
    .module('schoolterms')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
      /*
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Schoolterms',
      state: 'schoolterms',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'schoolterms', {
      title: 'List Schoolterms',
      state: 'schoolterms.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'schoolterms', {
      title: 'Create Schoolterm',
      state: 'schoolterms.create',
      roles: ['user']
    });*/
  }
})();
