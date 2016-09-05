'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Mcqexercise = mongoose.model('Mcqexercise'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  mcqexercise;

/**
 * Mcqexercise routes tests
 */
describe('Mcqexercise CRUD tests', function () {

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

    // Save a user to the test db and create new Mcqexercise
    user.save(function () {
      mcqexercise = {
        name: 'Mcqexercise name'
      };

      done();
    });
  });

  it('should be able to save a Mcqexercise if logged in', function (done) {
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

        // Save a new Mcqexercise
        agent.post('/api/mcqexercises')
          .send(mcqexercise)
          .expect(200)
          .end(function (mcqexerciseSaveErr, mcqexerciseSaveRes) {
            // Handle Mcqexercise save error
            if (mcqexerciseSaveErr) {
              return done(mcqexerciseSaveErr);
            }

            // Get a list of Mcqexercises
            agent.get('/api/mcqexercises')
              .end(function (mcqexercisesGetErr, mcqexercisesGetRes) {
                // Handle Mcqexercises save error
                if (mcqexercisesGetErr) {
                  return done(mcqexercisesGetErr);
                }

                // Get Mcqexercises list
                var mcqexercises = mcqexercisesGetRes.body;

                // Set assertions
                (mcqexercises[0].user._id).should.equal(userId);
                (mcqexercises[0].name).should.match('Mcqexercise name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Mcqexercise if not logged in', function (done) {
    agent.post('/api/mcqexercises')
      .send(mcqexercise)
      .expect(403)
      .end(function (mcqexerciseSaveErr, mcqexerciseSaveRes) {
        // Call the assertion callback
        done(mcqexerciseSaveErr);
      });
  });

  it('should not be able to save an Mcqexercise if no name is provided', function (done) {
    // Invalidate name field
    mcqexercise.name = '';

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

        // Save a new Mcqexercise
        agent.post('/api/mcqexercises')
          .send(mcqexercise)
          .expect(400)
          .end(function (mcqexerciseSaveErr, mcqexerciseSaveRes) {
            // Set message assertion
            (mcqexerciseSaveRes.body.message).should.match('Please fill Mcqexercise name');

            // Handle Mcqexercise save error
            done(mcqexerciseSaveErr);
          });
      });
  });

  it('should be able to update an Mcqexercise if signed in', function (done) {
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

        // Save a new Mcqexercise
        agent.post('/api/mcqexercises')
          .send(mcqexercise)
          .expect(200)
          .end(function (mcqexerciseSaveErr, mcqexerciseSaveRes) {
            // Handle Mcqexercise save error
            if (mcqexerciseSaveErr) {
              return done(mcqexerciseSaveErr);
            }

            // Update Mcqexercise name
            mcqexercise.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Mcqexercise
            agent.put('/api/mcqexercises/' + mcqexerciseSaveRes.body._id)
              .send(mcqexercise)
              .expect(200)
              .end(function (mcqexerciseUpdateErr, mcqexerciseUpdateRes) {
                // Handle Mcqexercise update error
                if (mcqexerciseUpdateErr) {
                  return done(mcqexerciseUpdateErr);
                }

                // Set assertions
                (mcqexerciseUpdateRes.body._id).should.equal(mcqexerciseSaveRes.body._id);
                (mcqexerciseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Mcqexercises if not signed in', function (done) {
    // Create new Mcqexercise model instance
    var mcqexerciseObj = new Mcqexercise(mcqexercise);

    // Save the mcqexercise
    mcqexerciseObj.save(function () {
      // Request Mcqexercises
      request(app).get('/api/mcqexercises')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Mcqexercise if not signed in', function (done) {
    // Create new Mcqexercise model instance
    var mcqexerciseObj = new Mcqexercise(mcqexercise);

    // Save the Mcqexercise
    mcqexerciseObj.save(function () {
      request(app).get('/api/mcqexercises/' + mcqexerciseObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', mcqexercise.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Mcqexercise with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/mcqexercises/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Mcqexercise is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Mcqexercise which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Mcqexercise
    request(app).get('/api/mcqexercises/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Mcqexercise with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Mcqexercise if signed in', function (done) {
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

        // Save a new Mcqexercise
        agent.post('/api/mcqexercises')
          .send(mcqexercise)
          .expect(200)
          .end(function (mcqexerciseSaveErr, mcqexerciseSaveRes) {
            // Handle Mcqexercise save error
            if (mcqexerciseSaveErr) {
              return done(mcqexerciseSaveErr);
            }

            // Delete an existing Mcqexercise
            agent.delete('/api/mcqexercises/' + mcqexerciseSaveRes.body._id)
              .send(mcqexercise)
              .expect(200)
              .end(function (mcqexerciseDeleteErr, mcqexerciseDeleteRes) {
                // Handle mcqexercise error error
                if (mcqexerciseDeleteErr) {
                  return done(mcqexerciseDeleteErr);
                }

                // Set assertions
                (mcqexerciseDeleteRes.body._id).should.equal(mcqexerciseSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Mcqexercise if not signed in', function (done) {
    // Set Mcqexercise user
    mcqexercise.user = user;

    // Create new Mcqexercise model instance
    var mcqexerciseObj = new Mcqexercise(mcqexercise);

    // Save the Mcqexercise
    mcqexerciseObj.save(function () {
      // Try deleting Mcqexercise
      request(app).delete('/api/mcqexercises/' + mcqexerciseObj._id)
        .expect(403)
        .end(function (mcqexerciseDeleteErr, mcqexerciseDeleteRes) {
          // Set message assertion
          (mcqexerciseDeleteRes.body.message).should.match('User is not authorized');

          // Handle Mcqexercise error error
          done(mcqexerciseDeleteErr);
        });

    });
  });

  it('should be able to get a single Mcqexercise that has an orphaned user reference', function (done) {
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

          // Save a new Mcqexercise
          agent.post('/api/mcqexercises')
            .send(mcqexercise)
            .expect(200)
            .end(function (mcqexerciseSaveErr, mcqexerciseSaveRes) {
              // Handle Mcqexercise save error
              if (mcqexerciseSaveErr) {
                return done(mcqexerciseSaveErr);
              }

              // Set assertions on new Mcqexercise
              (mcqexerciseSaveRes.body.name).should.equal(mcqexercise.name);
              should.exist(mcqexerciseSaveRes.body.user);
              should.equal(mcqexerciseSaveRes.body.user._id, orphanId);

              // force the Mcqexercise to have an orphaned user reference
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

                    // Get the Mcqexercise
                    agent.get('/api/mcqexercises/' + mcqexerciseSaveRes.body._id)
                      .expect(200)
                      .end(function (mcqexerciseInfoErr, mcqexerciseInfoRes) {
                        // Handle Mcqexercise error
                        if (mcqexerciseInfoErr) {
                          return done(mcqexerciseInfoErr);
                        }

                        // Set assertions
                        (mcqexerciseInfoRes.body._id).should.equal(mcqexerciseSaveRes.body._id);
                        (mcqexerciseInfoRes.body.name).should.equal(mcqexercise.name);
                        should.equal(mcqexerciseInfoRes.body.user, undefined);

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
      Mcqexercise.remove().exec(done);
    });
  });
});
