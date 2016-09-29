'use strict';

describe('Classexercises E2E Tests:', function () {
  describe('Test Classexercises page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/classexercises');
      expect(element.all(by.repeater('classexercise in classexercises')).count()).toEqual(0);
    });
  });
});
