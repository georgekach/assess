'use strict';

describe('Mediaresources E2E Tests:', function () {
  describe('Test Mediaresources page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/mediaresources');
      expect(element.all(by.repeater('mediaresource in mediaresources')).count()).toEqual(0);
    });
  });
});
