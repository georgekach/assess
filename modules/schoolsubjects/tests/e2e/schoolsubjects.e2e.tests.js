'use strict';

describe('Schoolsubjects E2E Tests:', function () {
  describe('Test Schoolsubjects page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/schoolsubjects');
      expect(element.all(by.repeater('schoolsubject in schoolsubjects')).count()).toEqual(0);
    });
  });
});
