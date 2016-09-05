'use strict';

describe('Mcqexercises E2E Tests:', function () {
  describe('Test Mcqexercises page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/mcqexercises');
      expect(element.all(by.repeater('mcqexercise in mcqexercises')).count()).toEqual(0);
    });
  });
});
