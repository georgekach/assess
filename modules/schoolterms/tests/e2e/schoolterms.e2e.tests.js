'use strict';

describe('Schoolterms E2E Tests:', function () {
  describe('Test Schoolterms page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/schoolterms');
      expect(element.all(by.repeater('schoolterm in schoolterms')).count()).toEqual(0);
    });
  });
});
