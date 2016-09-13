'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Applicationcodegroup = mongoose.model('Applicationcodegroup'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  applicationcodegroup;

/**
 * Applicationcodegroup routes tests
 */
describe('Applicationcodegroup CRUD tests', function () {

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

    // Save a user to the test db and create new Applicationcodegroup
    user.save(function () {
      applicationcodegroup = {
        name: 'Applicationcodegroup name'
      };

      done();
    });
  });

  it('should be able to save a Applicationcodegroup if logged in', function (done) {
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

        // Save a new Applicationcodegroup
        agent.post('/api/applicationcodegroups')
          .send(applicationcodegroup)
          .expect(200)
          .end(function (applicationcodegroupSaveErr, applicationcodegroupSaveRes) {
            // Handle Applicationcodegroup save error
            if (applicationcodegroupSaveErr) {
              return done(applicationcodegroupSaveErr);
            }

            // Get a list of Applicationcodegroups
            agent.get('/api/applicationcodegroups')
              .end(function (applicationcodegroupsGetErr, applicationcodegroupsGetRes) {
                // Handle Applicationcodegroups save error
                if (applicationcodegroupsGetErr) {
                  return done(applicationcodegroupsGetErr);
                }

                // Get Applicationcodegroups list
                var applicationcodegroups = applicationcodegroupsGetRes.body;

                // Set assertions
                (applicationcodegroups[0].user._id).should.equal(userId);
                (applicationcodegroups[0].name).should.match('Applicationcodegroup name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Applicationcodegroup if not logged in', function (done) {
    agent.post('/api/applicationcodegroups')
      .send(applicationcodegroup)
      .expect(403)
      .end(function (applicationcodegroupSaveErr, applicationcodegroupSaveRes) {
        // Call the assertion callback
        done(applicationcodegroupSaveErr);
      });
  });

  it('should not be able to save an Applicationcodegroup if no name is provided', function (done) {
    // Invalidate name field
    applicationcodegroup.name = '';

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

        // Save a new Applicationcodegroup
        agent.post('/api/applicationcodegroups')
          .send(applicationcodegroup)
          .expect(400)
          .end(function (applicationcodegroupSaveErr, applicationcodegroupSaveRes) {
            // Set message assertion
            (applicationcodegroupSaveRes.body.message).should.match('Please fill Applicationcodegroup name');

            // Handle Applicationcodegroup save error
            done(applicationcodegroupSaveErr);
          });
      });
  });

  it('should be able to update an Applicationcodegroup if signed in', function (done) {
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

        // Save a new Applicationcodegroup
        agent.post('/api/applicationcodegroups')
          .send(applicationcodegroup)
          .expect(200)
          .end(function (applicationcodegroupSaveErr, applicationcodegroupSaveRes) {
            // Handle Applicationcodegroup save error
            if (applicationcodegroupSaveErr) {
              return done(applicationcodegroupSaveErr);
            }

            // Update Applicationcodegroup name
            applicationcodegroup.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Applicationcodegroup
            agent.put('/api/applicationcodegroups/' + applicationcodegroupSaveRes.body._id)
              .send(applicationcodegroup)
              .expect(200)
              .end(function (applicationcodegroupUpdateErr, applicationcodegroupUpdateRes) {
                // Handle Applicationcodegroup update error
                if (applicationcodegroupUpdateErr) {
                  return done(applicationcodegroupUpdateErr);
                }

                // Set assertions
                (applicationcodegroupUpdateRes.body._id).should.equal(applicationcodegroupSaveRes.body._id);
                (applicationcodegroupUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Applicationcodegroups if not signed in', function (done) {
    // Create new Applicationcodegroup model instance
    var applicationcodegroupObj = new Applicationcodegroup(applicationcodegroup);

    // Save the applicationcodegroup
    applicationcodegroupObj.save(function () {
      // Request Applicationcodegroups
      request(app).get('/api/applicationcodegroups')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Applicationcodegroup if not signed in', function (done) {
    // Create new Applicationcodegroup model instance
    var applicationcodegroupObj = new Applicationcodegroup(applicationcodegroup);

    // Save the Applicationcodegroup
    applicationcodegroupObj.save(function () {
      request(app).get('/api/applicationcodegroups/' + applicationcodegroupObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', applicationcodegroup.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Applicationcodegroup with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/applicationcodegroups/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Applicationcodegroup is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Applicationcodegroup which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Applicationcodegroup
    request(app).get('/api/applicationcodegroups/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Applicationcodegroup with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Applicationcodegroup if signed in', function (done) {
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

        // Save a new Applicationcodegroup
        agent.post('/api/applicationcodegroups')
          .send(applicationcodegroup)
          .expect(200)
          .end(function (applicationcodegroupSaveErr, applicationcodegroupSaveRes) {
            // Handle Applicationcodegroup save error
            if (applicationcodegroupSaveErr) {
              return done(applicationcodegroupSaveErr);
            }

            // Delete an existing Applicationcodegroup
            agent.delete('/api/applicationcodegroups/' + applicationcodegroupSaveRes.body._id)
              .send(applicationcodegroup)
              .expect(200)
              .end(function (applicationcodegroupDeleteErr, applicationcodegroupDeleteRes) {
                // Handle applicationcodegroup error error
                if (applicationcodegroupDeleteErr) {
                  return done(applicationcodegroupDeleteErr);
                }

                // Set assertions
                (applicationcodegroupDeleteRes.body._id).should.equal(applicationcodegroupSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Applicationcodegroup if not signed in', function (done) {
    // Set Applicationcodegroup user
    applicationcodegroup.user = user;

    // Create new Applicationcodegroup model instance
    var applicationcodegroupObj = new Applicationcodegroup(applicationcodegroup);

    // Save the Applicationcodegroup
    applicationcodegroupObj.save(function () {
      // Try deleting Applicationcodegroup
      request(app).delete('/api/applicationcodegroups/' + applicationcodegroupObj._id)
        .expect(403)
        .end(function (applicationcodegroupDeleteErr, applicationcodegroupDeleteRes) {
          // Set message assertion
          (applicationcodegroupDeleteRes.body.message).should.match('User is not authorized');

          // Handle Applicationcodegroup error error
          done(applicationcodegroupDeleteErr);
        });

    });
  });

  it('should be able to get a single Applicationcodegroup that has an orphaned user reference', function (done) {
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

          // Save a new Applicationcodegroup
          agent.post('/api/applicationcodegroups')
            .send(applicationcodegroup)
            .expect(200)
            .end(function (applicationcodegroupSaveErr, applicationcodegroupSaveRes) {
              // Handle Applicationcodegroup save error
              if (applicationcodegroupSaveErr) {
                return done(applicationcodegroupSaveErr);
              }

              // Set assertions on new Applicationcodegroup
              (applicationcodegroupSaveRes.body.name).should.equal(applicationcodegroup.name);
              should.exist(applicationcodegroupSaveRes.body.user);
              should.equal(applicationcodegroupSaveRes.body.user._id, orphanId);

              // force the Applicationcodegroup to have an orphaned user reference
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

                    // Get the Applicationcodegroup
                    agent.get('/api/applicationcodegroups/' + applicationcodegroupSaveRes.body._id)
                      .expect(200)
                      .end(function (applicationcodegroupInfoErr, applicationcodegroupInfoRes) {
                        // Handle Applicationcodegroup error
                        if (applicationcodegroupInfoErr) {
                          return done(applicationcodegroupInfoErr);
                        }

                        // Set assertions
                        (applicationcodegroupInfoRes.body._id).should.equal(applicationcodegroupSaveRes.body._id);
                        (applicationcodegroupInfoRes.body.name).should.equal(applicationcodegroup.name);
                        should.equal(applicationcodegroupInfoRes.body.user, undefined);

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
      Applicationcodegroup.remove().exec(done);
    });
  });
});
