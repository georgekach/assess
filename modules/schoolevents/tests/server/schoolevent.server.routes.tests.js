'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Schoolevent = mongoose.model('Schoolevent'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  schoolevent;

/**
 * Schoolevent routes tests
 */
describe('Schoolevent CRUD tests', function () {

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

    // Save a user to the test db and create new Schoolevent
    user.save(function () {
      schoolevent = {
        name: 'Schoolevent name'
      };

      done();
    });
  });

  it('should be able to save a Schoolevent if logged in', function (done) {
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

        // Save a new Schoolevent
        agent.post('/api/schoolevents')
          .send(schoolevent)
          .expect(200)
          .end(function (schooleventSaveErr, schooleventSaveRes) {
            // Handle Schoolevent save error
            if (schooleventSaveErr) {
              return done(schooleventSaveErr);
            }

            // Get a list of Schoolevents
            agent.get('/api/schoolevents')
              .end(function (schooleventsGetErr, schooleventsGetRes) {
                // Handle Schoolevents save error
                if (schooleventsGetErr) {
                  return done(schooleventsGetErr);
                }

                // Get Schoolevents list
                var schoolevents = schooleventsGetRes.body;

                // Set assertions
                (schoolevents[0].user._id).should.equal(userId);
                (schoolevents[0].name).should.match('Schoolevent name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Schoolevent if not logged in', function (done) {
    agent.post('/api/schoolevents')
      .send(schoolevent)
      .expect(403)
      .end(function (schooleventSaveErr, schooleventSaveRes) {
        // Call the assertion callback
        done(schooleventSaveErr);
      });
  });

  it('should not be able to save an Schoolevent if no name is provided', function (done) {
    // Invalidate name field
    schoolevent.name = '';

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

        // Save a new Schoolevent
        agent.post('/api/schoolevents')
          .send(schoolevent)
          .expect(400)
          .end(function (schooleventSaveErr, schooleventSaveRes) {
            // Set message assertion
            (schooleventSaveRes.body.message).should.match('Please fill Schoolevent name');

            // Handle Schoolevent save error
            done(schooleventSaveErr);
          });
      });
  });

  it('should be able to update an Schoolevent if signed in', function (done) {
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

        // Save a new Schoolevent
        agent.post('/api/schoolevents')
          .send(schoolevent)
          .expect(200)
          .end(function (schooleventSaveErr, schooleventSaveRes) {
            // Handle Schoolevent save error
            if (schooleventSaveErr) {
              return done(schooleventSaveErr);
            }

            // Update Schoolevent name
            schoolevent.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Schoolevent
            agent.put('/api/schoolevents/' + schooleventSaveRes.body._id)
              .send(schoolevent)
              .expect(200)
              .end(function (schooleventUpdateErr, schooleventUpdateRes) {
                // Handle Schoolevent update error
                if (schooleventUpdateErr) {
                  return done(schooleventUpdateErr);
                }

                // Set assertions
                (schooleventUpdateRes.body._id).should.equal(schooleventSaveRes.body._id);
                (schooleventUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Schoolevents if not signed in', function (done) {
    // Create new Schoolevent model instance
    var schooleventObj = new Schoolevent(schoolevent);

    // Save the schoolevent
    schooleventObj.save(function () {
      // Request Schoolevents
      request(app).get('/api/schoolevents')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Schoolevent if not signed in', function (done) {
    // Create new Schoolevent model instance
    var schooleventObj = new Schoolevent(schoolevent);

    // Save the Schoolevent
    schooleventObj.save(function () {
      request(app).get('/api/schoolevents/' + schooleventObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', schoolevent.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Schoolevent with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/schoolevents/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Schoolevent is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Schoolevent which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Schoolevent
    request(app).get('/api/schoolevents/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Schoolevent with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Schoolevent if signed in', function (done) {
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

        // Save a new Schoolevent
        agent.post('/api/schoolevents')
          .send(schoolevent)
          .expect(200)
          .end(function (schooleventSaveErr, schooleventSaveRes) {
            // Handle Schoolevent save error
            if (schooleventSaveErr) {
              return done(schooleventSaveErr);
            }

            // Delete an existing Schoolevent
            agent.delete('/api/schoolevents/' + schooleventSaveRes.body._id)
              .send(schoolevent)
              .expect(200)
              .end(function (schooleventDeleteErr, schooleventDeleteRes) {
                // Handle schoolevent error error
                if (schooleventDeleteErr) {
                  return done(schooleventDeleteErr);
                }

                // Set assertions
                (schooleventDeleteRes.body._id).should.equal(schooleventSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Schoolevent if not signed in', function (done) {
    // Set Schoolevent user
    schoolevent.user = user;

    // Create new Schoolevent model instance
    var schooleventObj = new Schoolevent(schoolevent);

    // Save the Schoolevent
    schooleventObj.save(function () {
      // Try deleting Schoolevent
      request(app).delete('/api/schoolevents/' + schooleventObj._id)
        .expect(403)
        .end(function (schooleventDeleteErr, schooleventDeleteRes) {
          // Set message assertion
          (schooleventDeleteRes.body.message).should.match('User is not authorized');

          // Handle Schoolevent error error
          done(schooleventDeleteErr);
        });

    });
  });

  it('should be able to get a single Schoolevent that has an orphaned user reference', function (done) {
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

          // Save a new Schoolevent
          agent.post('/api/schoolevents')
            .send(schoolevent)
            .expect(200)
            .end(function (schooleventSaveErr, schooleventSaveRes) {
              // Handle Schoolevent save error
              if (schooleventSaveErr) {
                return done(schooleventSaveErr);
              }

              // Set assertions on new Schoolevent
              (schooleventSaveRes.body.name).should.equal(schoolevent.name);
              should.exist(schooleventSaveRes.body.user);
              should.equal(schooleventSaveRes.body.user._id, orphanId);

              // force the Schoolevent to have an orphaned user reference
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

                    // Get the Schoolevent
                    agent.get('/api/schoolevents/' + schooleventSaveRes.body._id)
                      .expect(200)
                      .end(function (schooleventInfoErr, schooleventInfoRes) {
                        // Handle Schoolevent error
                        if (schooleventInfoErr) {
                          return done(schooleventInfoErr);
                        }

                        // Set assertions
                        (schooleventInfoRes.body._id).should.equal(schooleventSaveRes.body._id);
                        (schooleventInfoRes.body.name).should.equal(schoolevent.name);
                        should.equal(schooleventInfoRes.body.user, undefined);

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
      Schoolevent.remove().exec(done);
    });
  });
});
