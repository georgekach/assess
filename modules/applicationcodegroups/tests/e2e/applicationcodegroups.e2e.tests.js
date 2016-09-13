'use strict';

describe('Applicationcodegroups E2E Tests:', function () {
  describe('Test Applicationcodegroups page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/applicationcodegroups');
      expect(element.all(by.repeater('applicationcodegroup in applicationcodegroups')).count()).toEqual(0);
    });
  });
});
