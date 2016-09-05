'use strict';

describe('Schoolclasses E2E Tests:', function () {
  describe('Test Schoolclasses page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/schoolclasses');
      expect(element.all(by.repeater('schoolclass in schoolclasses')).count()).toEqual(0);
    });
  });
});
