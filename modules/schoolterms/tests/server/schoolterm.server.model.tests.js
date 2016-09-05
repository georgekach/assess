'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Schoolterm = mongoose.model('Schoolterm');

/**
 * Globals
 */
var user, schoolterm;

/**
 * Unit tests
 */
describe('Schoolterm Model Unit Tests:', function() {
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
      schoolterm = new Schoolterm({
        name: 'Schoolterm Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return schoolterm.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) { 
      schoolterm.name = '';

      return schoolterm.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) { 
    Schoolterm.remove().exec(function(){
      User.remove().exec(function(){
        done();  
      });
    });
  });
});
