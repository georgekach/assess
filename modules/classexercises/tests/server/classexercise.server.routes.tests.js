'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Classexercise = mongoose.model('Classexercise'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  classexercise;

/**
 * Classexercise routes tests
 */
describe('Classexercise CRUD tests', function () {

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

    // Save a user to the test db and create new Classexercise
    user.save(function () {
      classexercise = {
        name: 'Classexercise name'
      };

      done();
    });
  });

  it('should be able to save a Classexercise if logged in', function (done) {
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

        // Save a new Classexercise
        agent.post('/api/classexercises')
          .send(classexercise)
          .expect(200)
          .end(function (classexerciseSaveErr, classexerciseSaveRes) {
            // Handle Classexercise save error
            if (classexerciseSaveErr) {
              return done(classexerciseSaveErr);
            }

            // Get a list of Classexercises
            agent.get('/api/classexercises')
              .end(function (classexercisesGetErr, classexercisesGetRes) {
                // Handle Classexercises save error
                if (classexercisesGetErr) {
                  return done(classexercisesGetErr);
                }

                // Get Classexercises list
                var classexercises = classexercisesGetRes.body;

                // Set assertions
                (classexercises[0].user._id).should.equal(userId);
                (classexercises[0].name).should.match('Classexercise name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Classexercise if not logged in', function (done) {
    agent.post('/api/classexercises')
      .send(classexercise)
      .expect(403)
      .end(function (classexerciseSaveErr, classexerciseSaveRes) {
        // Call the assertion callback
        done(classexerciseSaveErr);
      });
  });

  it('should not be able to save an Classexercise if no name is provided', function (done) {
    // Invalidate name field
    classexercise.name = '';

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

        // Save a new Classexercise
        agent.post('/api/classexercises')
          .send(classexercise)
          .expect(400)
          .end(function (classexerciseSaveErr, classexerciseSaveRes) {
            // Set message assertion
            (classexerciseSaveRes.body.message).should.match('Please fill Classexercise name');

            // Handle Classexercise save error
            done(classexerciseSaveErr);
          });
      });
  });

  it('should be able to update an Classexercise if signed in', function (done) {
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

        // Save a new Classexercise
        agent.post('/api/classexercises')
          .send(classexercise)
          .expect(200)
          .end(function (classexerciseSaveErr, classexerciseSaveRes) {
            // Handle Classexercise save error
            if (classexerciseSaveErr) {
              return done(classexerciseSaveErr);
            }

            // Update Classexercise name
            classexercise.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Classexercise
            agent.put('/api/classexercises/' + classexerciseSaveRes.body._id)
              .send(classexercise)
              .expect(200)
              .end(function (classexerciseUpdateErr, classexerciseUpdateRes) {
                // Handle Classexercise update error
                if (classexerciseUpdateErr) {
                  return done(classexerciseUpdateErr);
                }

                // Set assertions
                (classexerciseUpdateRes.body._id).should.equal(classexerciseSaveRes.body._id);
                (classexerciseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Classexercises if not signed in', function (done) {
    // Create new Classexercise model instance
    var classexerciseObj = new Classexercise(classexercise);

    // Save the classexercise
    classexerciseObj.save(function () {
      // Request Classexercises
      request(app).get('/api/classexercises')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Classexercise if not signed in', function (done) {
    // Create new Classexercise model instance
    var classexerciseObj = new Classexercise(classexercise);

    // Save the Classexercise
    classexerciseObj.save(function () {
      request(app).get('/api/classexercises/' + classexerciseObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', classexercise.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Classexercise with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/classexercises/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Classexercise is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Classexercise which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Classexercise
    request(app).get('/api/classexercises/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Classexercise with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Classexercise if signed in', function (done) {
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

        // Save a new Classexercise
        agent.post('/api/classexercises')
          .send(classexercise)
          .expect(200)
          .end(function (classexerciseSaveErr, classexerciseSaveRes) {
            // Handle Classexercise save error
            if (classexerciseSaveErr) {
              return done(classexerciseSaveErr);
            }

            // Delete an existing Classexercise
            agent.delete('/api/classexercises/' + classexerciseSaveRes.body._id)
              .send(classexercise)
              .expect(200)
              .end(function (classexerciseDeleteErr, classexerciseDeleteRes) {
                // Handle classexercise error error
                if (classexerciseDeleteErr) {
                  return done(classexerciseDeleteErr);
                }

                // Set assertions
                (classexerciseDeleteRes.body._id).should.equal(classexerciseSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Classexercise if not signed in', function (done) {
    // Set Classexercise user
    classexercise.user = user;

    // Create new Classexercise model instance
    var classexerciseObj = new Classexercise(classexercise);

    // Save the Classexercise
    classexerciseObj.save(function () {
      // Try deleting Classexercise
      request(app).delete('/api/classexercises/' + classexerciseObj._id)
        .expect(403)
        .end(function (classexerciseDeleteErr, classexerciseDeleteRes) {
          // Set message assertion
          (classexerciseDeleteRes.body.message).should.match('User is not authorized');

          // Handle Classexercise error error
          done(classexerciseDeleteErr);
        });

    });
  });

  it('should be able to get a single Classexercise that has an orphaned user reference', function (done) {
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

          // Save a new Classexercise
          agent.post('/api/classexercises')
            .send(classexercise)
            .expect(200)
            .end(function (classexerciseSaveErr, classexerciseSaveRes) {
              // Handle Classexercise save error
              if (classexerciseSaveErr) {
                return done(classexerciseSaveErr);
              }

              // Set assertions on new Classexercise
              (classexerciseSaveRes.body.name).should.equal(classexercise.name);
              should.exist(classexerciseSaveRes.body.user);
              should.equal(classexerciseSaveRes.body.user._id, orphanId);

              // force the Classexercise to have an orphaned user reference
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

                    // Get the Classexercise
                    agent.get('/api/classexercises/' + classexerciseSaveRes.body._id)
                      .expect(200)
                      .end(function (classexerciseInfoErr, classexerciseInfoRes) {
                        // Handle Classexercise error
                        if (classexerciseInfoErr) {
                          return done(classexerciseInfoErr);
                        }

                        // Set assertions
                        (classexerciseInfoRes.body._id).should.equal(classexerciseSaveRes.body._id);
                        (classexerciseInfoRes.body.name).should.equal(classexercise.name);
                        should.equal(classexerciseInfoRes.body.user, undefined);

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
      Classexercise.remove().exec(done);
    });
  });
});
