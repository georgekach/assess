'use strict';

describe('Classregisters E2E Tests:', function () {
  describe('Test Classregisters page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/classregisters');
      expect(element.all(by.repeater('classregister in classregisters')).count()).toEqual(0);
    });
  });
});
