'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Guardian = mongoose.model('Guardian'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, guardian;

/**
 * Guardian routes tests
 */
describe('Guardian CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Guardian
    user.save(function () {
      guardian = {
        name: 'Guardian name'
      };

      done();
    });
  });

  it('should be able to save a Guardian if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Guardian
        agent.post('/api/guardians')
          .send(guardian)
          .expect(200)
          .end(function (guardianSaveErr, guardianSaveRes) {
            // Handle Guardian save error
            if (guardianSaveErr) {
              return done(guardianSaveErr);
            }

            // Get a list of Guardians
            agent.get('/api/guardians')
              .end(function (guardiansGetErr, guardiansGetRes) {
                // Handle Guardian save error
                if (guardiansGetErr) {
                  return done(guardiansGetErr);
                }

                // Get Guardians list
                var guardians = guardiansGetRes.body;

                // Set assertions
                (guardians[0].user._id).should.equal(userId);
                (guardians[0].name).should.match('Guardian name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Guardian if not logged in', function (done) {
    agent.post('/api/guardians')
      .send(guardian)
      .expect(403)
      .end(function (guardianSaveErr, guardianSaveRes) {
        // Call the assertion callback
        done(guardianSaveErr);
      });
  });

  it('should not be able to save an Guardian if no name is provided', function (done) {
    // Invalidate name field
    guardian.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Guardian
        agent.post('/api/guardians')
          .send(guardian)
          .expect(400)
          .end(function (guardianSaveErr, guardianSaveRes) {
            // Set message assertion
            (guardianSaveRes.body.message).should.match('Please fill Guardian name');

            // Handle Guardian save error
            done(guardianSaveErr);
          });
      });
  });

  it('should be able to update an Guardian if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Guardian
        agent.post('/api/guardians')
          .send(guardian)
          .expect(200)
          .end(function (guardianSaveErr, guardianSaveRes) {
            // Handle Guardian save error
            if (guardianSaveErr) {
              return done(guardianSaveErr);
            }

            // Update Guardian name
            guardian.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Guardian
            agent.put('/api/guardians/' + guardianSaveRes.body._id)
              .send(guardian)
              .expect(200)
              .end(function (guardianUpdateErr, guardianUpdateRes) {
                // Handle Guardian update error
                if (guardianUpdateErr) {
                  return done(guardianUpdateErr);
                }

                // Set assertions
                (guardianUpdateRes.body._id).should.equal(guardianSaveRes.body._id);
                (guardianUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Guardians if not signed in', function (done) {
    // Create new Guardian model instance
    var guardianObj = new Guardian(guardian);

    // Save the guardian
    guardianObj.save(function () {
      // Request Guardians
      request(app).get('/api/guardians')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Guardian if not signed in', function (done) {
    // Create new Guardian model instance
    var guardianObj = new Guardian(guardian);

    // Save the Guardian
    guardianObj.save(function () {
      request(app).get('/api/guardians/' + guardianObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', guardian.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Guardian with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/guardians/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Guardian is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Guardian which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Guardian
    request(app).get('/api/guardians/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Guardian with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Guardian if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Guardian
        agent.post('/api/guardians')
          .send(guardian)
          .expect(200)
          .end(function (guardianSaveErr, guardianSaveRes) {
            // Handle Guardian save error
            if (guardianSaveErr) {
              return done(guardianSaveErr);
            }

            // Delete an existing Guardian
            agent.delete('/api/guardians/' + guardianSaveRes.body._id)
              .send(guardian)
              .expect(200)
              .end(function (guardianDeleteErr, guardianDeleteRes) {
                // Handle guardian error error
                if (guardianDeleteErr) {
                  return done(guardianDeleteErr);
                }

                // Set assertions
                (guardianDeleteRes.body._id).should.equal(guardianSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Guardian if not signed in', function (done) {
    // Set Guardian user
    guardian.user = user;

    // Create new Guardian model instance
    var guardianObj = new Guardian(guardian);

    // Save the Guardian
    guardianObj.save(function () {
      // Try deleting Guardian
      request(app).delete('/api/guardians/' + guardianObj._id)
        .expect(403)
        .end(function (guardianDeleteErr, guardianDeleteRes) {
          // Set message assertion
          (guardianDeleteRes.body.message).should.match('User is not authorized');

          // Handle Guardian error error
          done(guardianDeleteErr);
        });

    });
  });

  it('should be able to get a single Guardian that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Guardian
          agent.post('/api/guardians')
            .send(guardian)
            .expect(200)
            .end(function (guardianSaveErr, guardianSaveRes) {
              // Handle Guardian save error
              if (guardianSaveErr) {
                return done(guardianSaveErr);
              }

              // Set assertions on new Guardian
              (guardianSaveRes.body.name).should.equal(guardian.name);
              should.exist(guardianSaveRes.body.user);
              should.equal(guardianSaveRes.body.user._id, orphanId);

              // force the Guardian to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Guardian
                    agent.get('/api/guardians/' + guardianSaveRes.body._id)
                      .expect(200)
                      .end(function (guardianInfoErr, guardianInfoRes) {
                        // Handle Guardian error
                        if (guardianInfoErr) {
                          return done(guardianInfoErr);
                        }

                        // Set assertions
                        (guardianInfoRes.body._id).should.equal(guardianSaveRes.body._id);
                        (guardianInfoRes.body.name).should.equal(guardian.name);
                        should.equal(guardianInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Guardian.remove().exec(done);
    });
  });
});
