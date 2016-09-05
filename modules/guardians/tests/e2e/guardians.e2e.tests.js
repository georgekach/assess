'use strict';

describe('Guardians E2E Tests:', function () {
  describe('Test Guardians page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/guardians');
      expect(element.all(by.repeater('guardian in guardians')).count()).toEqual(0);
    });
  });
});
