'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Mediaresource = mongoose.model('Mediaresource');

/**
 * Globals
 */
var user,
  mediaresource;

/**
 * Unit tests
 */
describe('Mediaresource Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      mediaresource = new Mediaresource({
        name: 'Mediaresource Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return mediaresource.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      mediaresource.name = '';

      return mediaresource.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Mediaresource.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
