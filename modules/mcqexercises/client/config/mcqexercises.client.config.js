(function () {
  'use strict';

  angular
    .module('mcqexercises')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('sidebar', {
      title: 'MCQ Exercises',
      state: 'mcqexercises',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('sidebar', 'mcqexercises', {
      title: 'List MCQ Exercises',
      state: 'mcqexercises.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('sidebar', 'mcqexercises', {
      title: 'Create MCQ Exercise',
      state: 'mcqexercises.create',
      roles: ['user']
    });
  }
}());
