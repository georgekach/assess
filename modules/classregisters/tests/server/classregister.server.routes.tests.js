'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Classregister = mongoose.model('Classregister'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, classregister;

/**
 * Classregister routes tests
 */
describe('Classregister CRUD tests', function () {

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

    // Save a user to the test db and create new Classregister
    user.save(function () {
      classregister = {
        name: 'Classregister name'
      };

      done();
    });
  });

  it('should be able to save a Classregister if logged in', function (done) {
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

        // Save a new Classregister
        agent.post('/api/classregisters')
          .send(classregister)
          .expect(200)
          .end(function (classregisterSaveErr, classregisterSaveRes) {
            // Handle Classregister save error
            if (classregisterSaveErr) {
              return done(classregisterSaveErr);
            }

            // Get a list of Classregisters
            agent.get('/api/classregisters')
              .end(function (classregistersGetErr, classregistersGetRes) {
                // Handle Classregister save error
                if (classregistersGetErr) {
                  return done(classregistersGetErr);
                }

                // Get Classregisters list
                var classregisters = classregistersGetRes.body;

                // Set assertions
                (classregisters[0].user._id).should.equal(userId);
                (classregisters[0].name).should.match('Classregister name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Classregister if not logged in', function (done) {
    agent.post('/api/classregisters')
      .send(classregister)
      .expect(403)
      .end(function (classregisterSaveErr, classregisterSaveRes) {
        // Call the assertion callback
        done(classregisterSaveErr);
      });
  });

  it('should not be able to save an Classregister if no name is provided', function (done) {
    // Invalidate name field
    classregister.name = '';

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

        // Save a new Classregister
        agent.post('/api/classregisters')
          .send(classregister)
          .expect(400)
          .end(function (classregisterSaveErr, classregisterSaveRes) {
            // Set message assertion
            (classregisterSaveRes.body.message).should.match('Please fill Classregister name');

            // Handle Classregister save error
            done(classregisterSaveErr);
          });
      });
  });

  it('should be able to update an Classregister if signed in', function (done) {
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

        // Save a new Classregister
        agent.post('/api/classregisters')
          .send(classregister)
          .expect(200)
          .end(function (classregisterSaveErr, classregisterSaveRes) {
            // Handle Classregister save error
            if (classregisterSaveErr) {
              return done(classregisterSaveErr);
            }

            // Update Classregister name
            classregister.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Classregister
            agent.put('/api/classregisters/' + classregisterSaveRes.body._id)
              .send(classregister)
              .expect(200)
              .end(function (classregisterUpdateErr, classregisterUpdateRes) {
                // Handle Classregister update error
                if (classregisterUpdateErr) {
                  return done(classregisterUpdateErr);
                }

                // Set assertions
                (classregisterUpdateRes.body._id).should.equal(classregisterSaveRes.body._id);
                (classregisterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Classregisters if not signed in', function (done) {
    // Create new Classregister model instance
    var classregisterObj = new Classregister(classregister);

    // Save the classregister
    classregisterObj.save(function () {
      // Request Classregisters
      request(app).get('/api/classregisters')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Classregister if not signed in', function (done) {
    // Create new Classregister model instance
    var classregisterObj = new Classregister(classregister);

    // Save the Classregister
    classregisterObj.save(function () {
      request(app).get('/api/classregisters/' + classregisterObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', classregister.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Classregister with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/classregisters/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Classregister is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Classregister which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Classregister
    request(app).get('/api/classregisters/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Classregister with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Classregister if signed in', function (done) {
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

        // Save a new Classregister
        agent.post('/api/classregisters')
          .send(classregister)
          .expect(200)
          .end(function (classregisterSaveErr, classregisterSaveRes) {
            // Handle Classregister save error
            if (classregisterSaveErr) {
              return done(classregisterSaveErr);
            }

            // Delete an existing Classregister
            agent.delete('/api/classregisters/' + classregisterSaveRes.body._id)
              .send(classregister)
              .expect(200)
              .end(function (classregisterDeleteErr, classregisterDeleteRes) {
                // Handle classregister error error
                if (classregisterDeleteErr) {
                  return done(classregisterDeleteErr);
                }

                // Set assertions
                (classregisterDeleteRes.body._id).should.equal(classregisterSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Classregister if not signed in', function (done) {
    // Set Classregister user
    classregister.user = user;

    // Create new Classregister model instance
    var classregisterObj = new Classregister(classregister);

    // Save the Classregister
    classregisterObj.save(function () {
      // Try deleting Classregister
      request(app).delete('/api/classregisters/' + classregisterObj._id)
        .expect(403)
        .end(function (classregisterDeleteErr, classregisterDeleteRes) {
          // Set message assertion
          (classregisterDeleteRes.body.message).should.match('User is not authorized');

          // Handle Classregister error error
          done(classregisterDeleteErr);
        });

    });
  });

  it('should be able to get a single Classregister that has an orphaned user reference', function (done) {
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

          // Save a new Classregister
          agent.post('/api/classregisters')
            .send(classregister)
            .expect(200)
            .end(function (classregisterSaveErr, classregisterSaveRes) {
              // Handle Classregister save error
              if (classregisterSaveErr) {
                return done(classregisterSaveErr);
              }

              // Set assertions on new Classregister
              (classregisterSaveRes.body.name).should.equal(classregister.name);
              should.exist(classregisterSaveRes.body.user);
              should.equal(classregisterSaveRes.body.user._id, orphanId);

              // force the Classregister to have an orphaned user reference
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

                    // Get the Classregister
                    agent.get('/api/classregisters/' + classregisterSaveRes.body._id)
                      .expect(200)
                      .end(function (classregisterInfoErr, classregisterInfoRes) {
                        // Handle Classregister error
                        if (classregisterInfoErr) {
                          return done(classregisterInfoErr);
                        }

                        // Set assertions
                        (classregisterInfoRes.body._id).should.equal(classregisterSaveRes.body._id);
                        (classregisterInfoRes.body.name).should.equal(classregister.name);
                        should.equal(classregisterInfoRes.body.user, undefined);

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
      Classregister.remove().exec(done);
    });
  });
});
