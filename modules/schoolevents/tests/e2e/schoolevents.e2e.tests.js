'use strict';

describe('Schoolevents E2E Tests:', function () {
  describe('Test Schoolevents page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/schoolevents');
      expect(element.all(by.repeater('schoolevent in schoolevents')).count()).toEqual(0);
    });
  });
});
