'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Mediaresource = mongoose.model('Mediaresource'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  mediaresource;

/**
 * Mediaresource routes tests
 */
describe('Mediaresource CRUD tests', function () {

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

    // Save a user to the test db and create new Mediaresource
    user.save(function () {
      mediaresource = {
        name: 'Mediaresource name'
      };

      done();
    });
  });

  it('should be able to save a Mediaresource if logged in', function (done) {
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

        // Save a new Mediaresource
        agent.post('/api/mediaresources')
          .send(mediaresource)
          .expect(200)
          .end(function (mediaresourceSaveErr, mediaresourceSaveRes) {
            // Handle Mediaresource save error
            if (mediaresourceSaveErr) {
              return done(mediaresourceSaveErr);
            }

            // Get a list of Mediaresources
            agent.get('/api/mediaresources')
              .end(function (mediaresourcesGetErr, mediaresourcesGetRes) {
                // Handle Mediaresources save error
                if (mediaresourcesGetErr) {
                  return done(mediaresourcesGetErr);
                }

                // Get Mediaresources list
                var mediaresources = mediaresourcesGetRes.body;

                // Set assertions
                (mediaresources[0].user._id).should.equal(userId);
                (mediaresources[0].name).should.match('Mediaresource name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Mediaresource if not logged in', function (done) {
    agent.post('/api/mediaresources')
      .send(mediaresource)
      .expect(403)
      .end(function (mediaresourceSaveErr, mediaresourceSaveRes) {
        // Call the assertion callback
        done(mediaresourceSaveErr);
      });
  });

  it('should not be able to save an Mediaresource if no name is provided', function (done) {
    // Invalidate name field
    mediaresource.name = '';

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

        // Save a new Mediaresource
        agent.post('/api/mediaresources')
          .send(mediaresource)
          .expect(400)
          .end(function (mediaresourceSaveErr, mediaresourceSaveRes) {
            // Set message assertion
            (mediaresourceSaveRes.body.message).should.match('Please fill Mediaresource name');

            // Handle Mediaresource save error
            done(mediaresourceSaveErr);
          });
      });
  });

  it('should be able to update an Mediaresource if signed in', function (done) {
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

        // Save a new Mediaresource
        agent.post('/api/mediaresources')
          .send(mediaresource)
          .expect(200)
          .end(function (mediaresourceSaveErr, mediaresourceSaveRes) {
            // Handle Mediaresource save error
            if (mediaresourceSaveErr) {
              return done(mediaresourceSaveErr);
            }

            // Update Mediaresource name
            mediaresource.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Mediaresource
            agent.put('/api/mediaresources/' + mediaresourceSaveRes.body._id)
              .send(mediaresource)
              .expect(200)
              .end(function (mediaresourceUpdateErr, mediaresourceUpdateRes) {
                // Handle Mediaresource update error
                if (mediaresourceUpdateErr) {
                  return done(mediaresourceUpdateErr);
                }

                // Set assertions
                (mediaresourceUpdateRes.body._id).should.equal(mediaresourceSaveRes.body._id);
                (mediaresourceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Mediaresources if not signed in', function (done) {
    // Create new Mediaresource model instance
    var mediaresourceObj = new Mediaresource(mediaresource);

    // Save the mediaresource
    mediaresourceObj.save(function () {
      // Request Mediaresources
      request(app).get('/api/mediaresources')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Mediaresource if not signed in', function (done) {
    // Create new Mediaresource model instance
    var mediaresourceObj = new Mediaresource(mediaresource);

    // Save the Mediaresource
    mediaresourceObj.save(function () {
      request(app).get('/api/mediaresources/' + mediaresourceObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', mediaresource.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Mediaresource with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/mediaresources/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Mediaresource is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Mediaresource which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Mediaresource
    request(app).get('/api/mediaresources/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Mediaresource with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Mediaresource if signed in', function (done) {
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

        // Save a new Mediaresource
        agent.post('/api/mediaresources')
          .send(mediaresource)
          .expect(200)
          .end(function (mediaresourceSaveErr, mediaresourceSaveRes) {
            // Handle Mediaresource save error
            if (mediaresourceSaveErr) {
              return done(mediaresourceSaveErr);
            }

            // Delete an existing Mediaresource
            agent.delete('/api/mediaresources/' + mediaresourceSaveRes.body._id)
              .send(mediaresource)
              .expect(200)
              .end(function (mediaresourceDeleteErr, mediaresourceDeleteRes) {
                // Handle mediaresource error error
                if (mediaresourceDeleteErr) {
                  return done(mediaresourceDeleteErr);
                }

                // Set assertions
                (mediaresourceDeleteRes.body._id).should.equal(mediaresourceSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Mediaresource if not signed in', function (done) {
    // Set Mediaresource user
    mediaresource.user = user;

    // Create new Mediaresource model instance
    var mediaresourceObj = new Mediaresource(mediaresource);

    // Save the Mediaresource
    mediaresourceObj.save(function () {
      // Try deleting Mediaresource
      request(app).delete('/api/mediaresources/' + mediaresourceObj._id)
        .expect(403)
        .end(function (mediaresourceDeleteErr, mediaresourceDeleteRes) {
          // Set message assertion
          (mediaresourceDeleteRes.body.message).should.match('User is not authorized');

          // Handle Mediaresource error error
          done(mediaresourceDeleteErr);
        });

    });
  });

  it('should be able to get a single Mediaresource that has an orphaned user reference', function (done) {
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

          // Save a new Mediaresource
          agent.post('/api/mediaresources')
            .send(mediaresource)
            .expect(200)
            .end(function (mediaresourceSaveErr, mediaresourceSaveRes) {
              // Handle Mediaresource save error
              if (mediaresourceSaveErr) {
                return done(mediaresourceSaveErr);
              }

              // Set assertions on new Mediaresource
              (mediaresourceSaveRes.body.name).should.equal(mediaresource.name);
              should.exist(mediaresourceSaveRes.body.user);
              should.equal(mediaresourceSaveRes.body.user._id, orphanId);

              // force the Mediaresource to have an orphaned user reference
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

                    // Get the Mediaresource
                    agent.get('/api/mediaresources/' + mediaresourceSaveRes.body._id)
                      .expect(200)
                      .end(function (mediaresourceInfoErr, mediaresourceInfoRes) {
                        // Handle Mediaresource error
                        if (mediaresourceInfoErr) {
                          return done(mediaresourceInfoErr);
                        }

                        // Set assertions
                        (mediaresourceInfoRes.body._id).should.equal(mediaresourceSaveRes.body._id);
                        (mediaresourceInfoRes.body.name).should.equal(mediaresource.name);
                        should.equal(mediaresourceInfoRes.body.user, undefined);

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
      Mediaresource.remove().exec(done);
    });
  });
});
