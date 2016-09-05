(function () {
  'use strict';

  angular
    .module('mcqexercises')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('sidebar', {
      title: 'Mcqexercises',
      state: 'mcqexercises',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('sidebar', 'mcqexercises', {
      title: 'List Mcqexercises',
      state: 'mcqexercises.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('sidebar', 'mcqexercises', {
      title: 'Create Mcqexercise',
      state: 'mcqexercises.create',
      roles: ['user']
    });
  }
}());
