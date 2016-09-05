'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Schoolclass = mongoose.model('Schoolclass'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, schoolclass;

/**
 * Schoolclass routes tests
 */
describe('Schoolclass CRUD tests', function () {

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

    // Save a user to the test db and create new Schoolclass
    user.save(function () {
      schoolclass = {
        name: 'Schoolclass name'
      };

      done();
    });
  });

  it('should be able to save a Schoolclass if logged in', function (done) {
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

        // Save a new Schoolclass
        agent.post('/api/schoolclasses')
          .send(schoolclass)
          .expect(200)
          .end(function (schoolclassSaveErr, schoolclassSaveRes) {
            // Handle Schoolclass save error
            if (schoolclassSaveErr) {
              return done(schoolclassSaveErr);
            }

            // Get a list of Schoolclasses
            agent.get('/api/schoolclasses')
              .end(function (schoolclasssGetErr, schoolclasssGetRes) {
                // Handle Schoolclass save error
                if (schoolclasssGetErr) {
                  return done(schoolclasssGetErr);
                }

                // Get Schoolclasses list
                var schoolclasses = schoolclasssGetRes.body;

                // Set assertions
                (schoolclasses[0].user._id).should.equal(userId);
                (schoolclasses[0].name).should.match('Schoolclass name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Schoolclass if not logged in', function (done) {
    agent.post('/api/schoolclasses')
      .send(schoolclass)
      .expect(403)
      .end(function (schoolclassSaveErr, schoolclassSaveRes) {
        // Call the assertion callback
        done(schoolclassSaveErr);
      });
  });

  it('should not be able to save an Schoolclass if no name is provided', function (done) {
    // Invalidate name field
    schoolclass.name = '';

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

        // Save a new Schoolclass
        agent.post('/api/schoolclasses')
          .send(schoolclass)
          .expect(400)
          .end(function (schoolclassSaveErr, schoolclassSaveRes) {
            // Set message assertion
            (schoolclassSaveRes.body.message).should.match('Please fill Schoolclass name');

            // Handle Schoolclass save error
            done(schoolclassSaveErr);
          });
      });
  });

  it('should be able to update an Schoolclass if signed in', function (done) {
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

        // Save a new Schoolclass
        agent.post('/api/schoolclasses')
          .send(schoolclass)
          .expect(200)
          .end(function (schoolclassSaveErr, schoolclassSaveRes) {
            // Handle Schoolclass save error
            if (schoolclassSaveErr) {
              return done(schoolclassSaveErr);
            }

            // Update Schoolclass name
            schoolclass.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Schoolclass
            agent.put('/api/schoolclasses/' + schoolclassSaveRes.body._id)
              .send(schoolclass)
              .expect(200)
              .end(function (schoolclassUpdateErr, schoolclassUpdateRes) {
                // Handle Schoolclass update error
                if (schoolclassUpdateErr) {
                  return done(schoolclassUpdateErr);
                }

                // Set assertions
                (schoolclassUpdateRes.body._id).should.equal(schoolclassSaveRes.body._id);
                (schoolclassUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Schoolclasses if not signed in', function (done) {
    // Create new Schoolclass model instance
    var schoolclassObj = new Schoolclass(schoolclass);

    // Save the schoolclass
    schoolclassObj.save(function () {
      // Request Schoolclasses
      request(app).get('/api/schoolclasses')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Schoolclass if not signed in', function (done) {
    // Create new Schoolclass model instance
    var schoolclassObj = new Schoolclass(schoolclass);

    // Save the Schoolclass
    schoolclassObj.save(function () {
      request(app).get('/api/schoolclasses/' + schoolclassObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', schoolclass.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Schoolclass with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/schoolclasses/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Schoolclass is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Schoolclass which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Schoolclass
    request(app).get('/api/schoolclasses/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Schoolclass with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Schoolclass if signed in', function (done) {
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

        // Save a new Schoolclass
        agent.post('/api/schoolclasses')
          .send(schoolclass)
          .expect(200)
          .end(function (schoolclassSaveErr, schoolclassSaveRes) {
            // Handle Schoolclass save error
            if (schoolclassSaveErr) {
              return done(schoolclassSaveErr);
            }

            // Delete an existing Schoolclass
            agent.delete('/api/schoolclasses/' + schoolclassSaveRes.body._id)
              .send(schoolclass)
              .expect(200)
              .end(function (schoolclassDeleteErr, schoolclassDeleteRes) {
                // Handle schoolclass error error
                if (schoolclassDeleteErr) {
                  return done(schoolclassDeleteErr);
                }

                // Set assertions
                (schoolclassDeleteRes.body._id).should.equal(schoolclassSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Schoolclass if not signed in', function (done) {
    // Set Schoolclass user
    schoolclass.user = user;

    // Create new Schoolclass model instance
    var schoolclassObj = new Schoolclass(schoolclass);

    // Save the Schoolclass
    schoolclassObj.save(function () {
      // Try deleting Schoolclass
      request(app).delete('/api/schoolclasses/' + schoolclassObj._id)
        .expect(403)
        .end(function (schoolclassDeleteErr, schoolclassDeleteRes) {
          // Set message assertion
          (schoolclassDeleteRes.body.message).should.match('User is not authorized');

          // Handle Schoolclass error error
          done(schoolclassDeleteErr);
        });

    });
  });

  it('should be able to get a single Schoolclass that has an orphaned user reference', function (done) {
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

          // Save a new Schoolclass
          agent.post('/api/schoolclasses')
            .send(schoolclass)
            .expect(200)
            .end(function (schoolclassSaveErr, schoolclassSaveRes) {
              // Handle Schoolclass save error
              if (schoolclassSaveErr) {
                return done(schoolclassSaveErr);
              }

              // Set assertions on new Schoolclass
              (schoolclassSaveRes.body.name).should.equal(schoolclass.name);
              should.exist(schoolclassSaveRes.body.user);
              should.equal(schoolclassSaveRes.body.user._id, orphanId);

              // force the Schoolclass to have an orphaned user reference
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

                    // Get the Schoolclass
                    agent.get('/api/schoolclasses/' + schoolclassSaveRes.body._id)
                      .expect(200)
                      .end(function (schoolclassInfoErr, schoolclassInfoRes) {
                        // Handle Schoolclass error
                        if (schoolclassInfoErr) {
                          return done(schoolclassInfoErr);
                        }

                        // Set assertions
                        (schoolclassInfoRes.body._id).should.equal(schoolclassSaveRes.body._id);
                        (schoolclassInfoRes.body.name).should.equal(schoolclass.name);
                        should.equal(schoolclassInfoRes.body.user, undefined);

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
      Schoolclass.remove().exec(done);
    });
  });
});
