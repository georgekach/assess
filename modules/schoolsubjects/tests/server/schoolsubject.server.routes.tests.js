'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Schoolsubject = mongoose.model('Schoolsubject'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  schoolsubject;

/**
 * Schoolsubject routes tests
 */
describe('Schoolsubject CRUD tests', function () {

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

    // Save a user to the test db and create new Schoolsubject
    user.save(function () {
      schoolsubject = {
        name: 'Schoolsubject name'
      };

      done();
    });
  });

  it('should be able to save a Schoolsubject if logged in', function (done) {
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

        // Save a new Schoolsubject
        agent.post('/api/schoolsubjects')
          .send(schoolsubject)
          .expect(200)
          .end(function (schoolsubjectSaveErr, schoolsubjectSaveRes) {
            // Handle Schoolsubject save error
            if (schoolsubjectSaveErr) {
              return done(schoolsubjectSaveErr);
            }

            // Get a list of Schoolsubjects
            agent.get('/api/schoolsubjects')
              .end(function (schoolsubjectsGetErr, schoolsubjectsGetRes) {
                // Handle Schoolsubjects save error
                if (schoolsubjectsGetErr) {
                  return done(schoolsubjectsGetErr);
                }

                // Get Schoolsubjects list
                var schoolsubjects = schoolsubjectsGetRes.body;

                // Set assertions
                (schoolsubjects[0].user._id).should.equal(userId);
                (schoolsubjects[0].name).should.match('Schoolsubject name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Schoolsubject if not logged in', function (done) {
    agent.post('/api/schoolsubjects')
      .send(schoolsubject)
      .expect(403)
      .end(function (schoolsubjectSaveErr, schoolsubjectSaveRes) {
        // Call the assertion callback
        done(schoolsubjectSaveErr);
      });
  });

  it('should not be able to save an Schoolsubject if no name is provided', function (done) {
    // Invalidate name field
    schoolsubject.name = '';

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

        // Save a new Schoolsubject
        agent.post('/api/schoolsubjects')
          .send(schoolsubject)
          .expect(400)
          .end(function (schoolsubjectSaveErr, schoolsubjectSaveRes) {
            // Set message assertion
            (schoolsubjectSaveRes.body.message).should.match('Please fill Schoolsubject name');

            // Handle Schoolsubject save error
            done(schoolsubjectSaveErr);
          });
      });
  });

  it('should be able to update an Schoolsubject if signed in', function (done) {
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

        // Save a new Schoolsubject
        agent.post('/api/schoolsubjects')
          .send(schoolsubject)
          .expect(200)
          .end(function (schoolsubjectSaveErr, schoolsubjectSaveRes) {
            // Handle Schoolsubject save error
            if (schoolsubjectSaveErr) {
              return done(schoolsubjectSaveErr);
            }

            // Update Schoolsubject name
            schoolsubject.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Schoolsubject
            agent.put('/api/schoolsubjects/' + schoolsubjectSaveRes.body._id)
              .send(schoolsubject)
              .expect(200)
              .end(function (schoolsubjectUpdateErr, schoolsubjectUpdateRes) {
                // Handle Schoolsubject update error
                if (schoolsubjectUpdateErr) {
                  return done(schoolsubjectUpdateErr);
                }

                // Set assertions
                (schoolsubjectUpdateRes.body._id).should.equal(schoolsubjectSaveRes.body._id);
                (schoolsubjectUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Schoolsubjects if not signed in', function (done) {
    // Create new Schoolsubject model instance
    var schoolsubjectObj = new Schoolsubject(schoolsubject);

    // Save the schoolsubject
    schoolsubjectObj.save(function () {
      // Request Schoolsubjects
      request(app).get('/api/schoolsubjects')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Schoolsubject if not signed in', function (done) {
    // Create new Schoolsubject model instance
    var schoolsubjectObj = new Schoolsubject(schoolsubject);

    // Save the Schoolsubject
    schoolsubjectObj.save(function () {
      request(app).get('/api/schoolsubjects/' + schoolsubjectObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', schoolsubject.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Schoolsubject with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/schoolsubjects/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Schoolsubject is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Schoolsubject which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Schoolsubject
    request(app).get('/api/schoolsubjects/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Schoolsubject with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Schoolsubject if signed in', function (done) {
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

        // Save a new Schoolsubject
        agent.post('/api/schoolsubjects')
          .send(schoolsubject)
          .expect(200)
          .end(function (schoolsubjectSaveErr, schoolsubjectSaveRes) {
            // Handle Schoolsubject save error
            if (schoolsubjectSaveErr) {
              return done(schoolsubjectSaveErr);
            }

            // Delete an existing Schoolsubject
            agent.delete('/api/schoolsubjects/' + schoolsubjectSaveRes.body._id)
              .send(schoolsubject)
              .expect(200)
              .end(function (schoolsubjectDeleteErr, schoolsubjectDeleteRes) {
                // Handle schoolsubject error error
                if (schoolsubjectDeleteErr) {
                  return done(schoolsubjectDeleteErr);
                }

                // Set assertions
                (schoolsubjectDeleteRes.body._id).should.equal(schoolsubjectSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Schoolsubject if not signed in', function (done) {
    // Set Schoolsubject user
    schoolsubject.user = user;

    // Create new Schoolsubject model instance
    var schoolsubjectObj = new Schoolsubject(schoolsubject);

    // Save the Schoolsubject
    schoolsubjectObj.save(function () {
      // Try deleting Schoolsubject
      request(app).delete('/api/schoolsubjects/' + schoolsubjectObj._id)
        .expect(403)
        .end(function (schoolsubjectDeleteErr, schoolsubjectDeleteRes) {
          // Set message assertion
          (schoolsubjectDeleteRes.body.message).should.match('User is not authorized');

          // Handle Schoolsubject error error
          done(schoolsubjectDeleteErr);
        });

    });
  });

  it('should be able to get a single Schoolsubject that has an orphaned user reference', function (done) {
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

          // Save a new Schoolsubject
          agent.post('/api/schoolsubjects')
            .send(schoolsubject)
            .expect(200)
            .end(function (schoolsubjectSaveErr, schoolsubjectSaveRes) {
              // Handle Schoolsubject save error
              if (schoolsubjectSaveErr) {
                return done(schoolsubjectSaveErr);
              }

              // Set assertions on new Schoolsubject
              (schoolsubjectSaveRes.body.name).should.equal(schoolsubject.name);
              should.exist(schoolsubjectSaveRes.body.user);
              should.equal(schoolsubjectSaveRes.body.user._id, orphanId);

              // force the Schoolsubject to have an orphaned user reference
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

                    // Get the Schoolsubject
                    agent.get('/api/schoolsubjects/' + schoolsubjectSaveRes.body._id)
                      .expect(200)
                      .end(function (schoolsubjectInfoErr, schoolsubjectInfoRes) {
                        // Handle Schoolsubject error
                        if (schoolsubjectInfoErr) {
                          return done(schoolsubjectInfoErr);
                        }

                        // Set assertions
                        (schoolsubjectInfoRes.body._id).should.equal(schoolsubjectSaveRes.body._id);
                        (schoolsubjectInfoRes.body.name).should.equal(schoolsubject.name);
                        should.equal(schoolsubjectInfoRes.body.user, undefined);

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
      Schoolsubject.remove().exec(done);
    });
  });
});
