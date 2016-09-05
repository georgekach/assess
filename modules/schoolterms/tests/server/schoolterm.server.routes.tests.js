'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Schoolterm = mongoose.model('Schoolterm'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, schoolterm;

/**
 * Schoolterm routes tests
 */
describe('Schoolterm CRUD tests', function () {

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

    // Save a user to the test db and create new Schoolterm
    user.save(function () {
      schoolterm = {
        name: 'Schoolterm name'
      };

      done();
    });
  });

  it('should be able to save a Schoolterm if logged in', function (done) {
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

        // Save a new Schoolterm
        agent.post('/api/schoolterms')
          .send(schoolterm)
          .expect(200)
          .end(function (schooltermSaveErr, schooltermSaveRes) {
            // Handle Schoolterm save error
            if (schooltermSaveErr) {
              return done(schooltermSaveErr);
            }

            // Get a list of Schoolterms
            agent.get('/api/schoolterms')
              .end(function (schooltermsGetErr, schooltermsGetRes) {
                // Handle Schoolterm save error
                if (schooltermsGetErr) {
                  return done(schooltermsGetErr);
                }

                // Get Schoolterms list
                var schoolterms = schooltermsGetRes.body;

                // Set assertions
                (schoolterms[0].user._id).should.equal(userId);
                (schoolterms[0].name).should.match('Schoolterm name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Schoolterm if not logged in', function (done) {
    agent.post('/api/schoolterms')
      .send(schoolterm)
      .expect(403)
      .end(function (schooltermSaveErr, schooltermSaveRes) {
        // Call the assertion callback
        done(schooltermSaveErr);
      });
  });

  it('should not be able to save an Schoolterm if no name is provided', function (done) {
    // Invalidate name field
    schoolterm.name = '';

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

        // Save a new Schoolterm
        agent.post('/api/schoolterms')
          .send(schoolterm)
          .expect(400)
          .end(function (schooltermSaveErr, schooltermSaveRes) {
            // Set message assertion
            (schooltermSaveRes.body.message).should.match('Please fill Schoolterm name');

            // Handle Schoolterm save error
            done(schooltermSaveErr);
          });
      });
  });

  it('should be able to update an Schoolterm if signed in', function (done) {
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

        // Save a new Schoolterm
        agent.post('/api/schoolterms')
          .send(schoolterm)
          .expect(200)
          .end(function (schooltermSaveErr, schooltermSaveRes) {
            // Handle Schoolterm save error
            if (schooltermSaveErr) {
              return done(schooltermSaveErr);
            }

            // Update Schoolterm name
            schoolterm.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Schoolterm
            agent.put('/api/schoolterms/' + schooltermSaveRes.body._id)
              .send(schoolterm)
              .expect(200)
              .end(function (schooltermUpdateErr, schooltermUpdateRes) {
                // Handle Schoolterm update error
                if (schooltermUpdateErr) {
                  return done(schooltermUpdateErr);
                }

                // Set assertions
                (schooltermUpdateRes.body._id).should.equal(schooltermSaveRes.body._id);
                (schooltermUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Schoolterms if not signed in', function (done) {
    // Create new Schoolterm model instance
    var schooltermObj = new Schoolterm(schoolterm);

    // Save the schoolterm
    schooltermObj.save(function () {
      // Request Schoolterms
      request(app).get('/api/schoolterms')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Schoolterm if not signed in', function (done) {
    // Create new Schoolterm model instance
    var schooltermObj = new Schoolterm(schoolterm);

    // Save the Schoolterm
    schooltermObj.save(function () {
      request(app).get('/api/schoolterms/' + schooltermObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', schoolterm.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Schoolterm with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/schoolterms/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Schoolterm is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Schoolterm which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Schoolterm
    request(app).get('/api/schoolterms/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Schoolterm with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Schoolterm if signed in', function (done) {
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

        // Save a new Schoolterm
        agent.post('/api/schoolterms')
          .send(schoolterm)
          .expect(200)
          .end(function (schooltermSaveErr, schooltermSaveRes) {
            // Handle Schoolterm save error
            if (schooltermSaveErr) {
              return done(schooltermSaveErr);
            }

            // Delete an existing Schoolterm
            agent.delete('/api/schoolterms/' + schooltermSaveRes.body._id)
              .send(schoolterm)
              .expect(200)
              .end(function (schooltermDeleteErr, schooltermDeleteRes) {
                // Handle schoolterm error error
                if (schooltermDeleteErr) {
                  return done(schooltermDeleteErr);
                }

                // Set assertions
                (schooltermDeleteRes.body._id).should.equal(schooltermSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Schoolterm if not signed in', function (done) {
    // Set Schoolterm user
    schoolterm.user = user;

    // Create new Schoolterm model instance
    var schooltermObj = new Schoolterm(schoolterm);

    // Save the Schoolterm
    schooltermObj.save(function () {
      // Try deleting Schoolterm
      request(app).delete('/api/schoolterms/' + schooltermObj._id)
        .expect(403)
        .end(function (schooltermDeleteErr, schooltermDeleteRes) {
          // Set message assertion
          (schooltermDeleteRes.body.message).should.match('User is not authorized');

          // Handle Schoolterm error error
          done(schooltermDeleteErr);
        });

    });
  });

  it('should be able to get a single Schoolterm that has an orphaned user reference', function (done) {
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

          // Save a new Schoolterm
          agent.post('/api/schoolterms')
            .send(schoolterm)
            .expect(200)
            .end(function (schooltermSaveErr, schooltermSaveRes) {
              // Handle Schoolterm save error
              if (schooltermSaveErr) {
                return done(schooltermSaveErr);
              }

              // Set assertions on new Schoolterm
              (schooltermSaveRes.body.name).should.equal(schoolterm.name);
              should.exist(schooltermSaveRes.body.user);
              should.equal(schooltermSaveRes.body.user._id, orphanId);

              // force the Schoolterm to have an orphaned user reference
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

                    // Get the Schoolterm
                    agent.get('/api/schoolterms/' + schooltermSaveRes.body._id)
                      .expect(200)
                      .end(function (schooltermInfoErr, schooltermInfoRes) {
                        // Handle Schoolterm error
                        if (schooltermInfoErr) {
                          return done(schooltermInfoErr);
                        }

                        // Set assertions
                        (schooltermInfoRes.body._id).should.equal(schooltermSaveRes.body._id);
                        (schooltermInfoRes.body.name).should.equal(schoolterm.name);
                        should.equal(schooltermInfoRes.body.user, undefined);

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
      Schoolterm.remove().exec(done);
    });
  });
});
