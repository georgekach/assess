'use strict';

describe('Announcements E2E Tests:', function () {
  describe('Test Announcements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/announcements');
      expect(element.all(by.repeater('announcement in announcements')).count()).toEqual(0);
    });
  });
});
