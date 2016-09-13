(function () {
  'use strict';

  angular
    .module('applicationcodegroups')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('sidebar', {
      title: 'Application Codes',
      state: 'applicationcodegroups',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('sidebar', 'applicationcodegroups', {
      title: 'List Code Groups',
      state: 'applicationcodegroups.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('sidebar', 'applicationcodegroups', {
      title: 'Create Application Code Group',
      state: 'applicationcodegroups.create',
      roles: ['user']
    });
  }
}());
