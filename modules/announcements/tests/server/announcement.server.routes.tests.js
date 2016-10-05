'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Announcement = mongoose.model('Announcement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  announcement;

/**
 * Announcement routes tests
 */
describe('Announcement CRUD tests', function () {

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

    // Save a user to the test db and create new Announcement
    user.save(function () {
      announcement = {
        name: 'Announcement name'
      };

      done();
    });
  });

  it('should be able to save a Announcement if logged in', function (done) {
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

        // Save a new Announcement
        agent.post('/api/announcements')
          .send(announcement)
          .expect(200)
          .end(function (announcementSaveErr, announcementSaveRes) {
            // Handle Announcement save error
            if (announcementSaveErr) {
              return done(announcementSaveErr);
            }

            // Get a list of Announcements
            agent.get('/api/announcements')
              .end(function (announcementsGetErr, announcementsGetRes) {
                // Handle Announcements save error
                if (announcementsGetErr) {
                  return done(announcementsGetErr);
                }

                // Get Announcements list
                var announcements = announcementsGetRes.body;

                // Set assertions
                (announcements[0].user._id).should.equal(userId);
                (announcements[0].name).should.match('Announcement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Announcement if not logged in', function (done) {
    agent.post('/api/announcements')
      .send(announcement)
      .expect(403)
      .end(function (announcementSaveErr, announcementSaveRes) {
        // Call the assertion callback
        done(announcementSaveErr);
      });
  });

  it('should not be able to save an Announcement if no name is provided', function (done) {
    // Invalidate name field
    announcement.name = '';

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

        // Save a new Announcement
        agent.post('/api/announcements')
          .send(announcement)
          .expect(400)
          .end(function (announcementSaveErr, announcementSaveRes) {
            // Set message assertion
            (announcementSaveRes.body.message).should.match('Please fill Announcement name');

            // Handle Announcement save error
            done(announcementSaveErr);
          });
      });
  });

  it('should be able to update an Announcement if signed in', function (done) {
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

        // Save a new Announcement
        agent.post('/api/announcements')
          .send(announcement)
          .expect(200)
          .end(function (announcementSaveErr, announcementSaveRes) {
            // Handle Announcement save error
            if (announcementSaveErr) {
              return done(announcementSaveErr);
            }

            // Update Announcement name
            announcement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Announcement
            agent.put('/api/announcements/' + announcementSaveRes.body._id)
              .send(announcement)
              .expect(200)
              .end(function (announcementUpdateErr, announcementUpdateRes) {
                // Handle Announcement update error
                if (announcementUpdateErr) {
                  return done(announcementUpdateErr);
                }

                // Set assertions
                (announcementUpdateRes.body._id).should.equal(announcementSaveRes.body._id);
                (announcementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Announcements if not signed in', function (done) {
    // Create new Announcement model instance
    var announcementObj = new Announcement(announcement);

    // Save the announcement
    announcementObj.save(function () {
      // Request Announcements
      request(app).get('/api/announcements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Announcement if not signed in', function (done) {
    // Create new Announcement model instance
    var announcementObj = new Announcement(announcement);

    // Save the Announcement
    announcementObj.save(function () {
      request(app).get('/api/announcements/' + announcementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', announcement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Announcement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/announcements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Announcement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Announcement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Announcement
    request(app).get('/api/announcements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Announcement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Announcement if signed in', function (done) {
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

        // Save a new Announcement
        agent.post('/api/announcements')
          .send(announcement)
          .expect(200)
          .end(function (announcementSaveErr, announcementSaveRes) {
            // Handle Announcement save error
            if (announcementSaveErr) {
              return done(announcementSaveErr);
            }

            // Delete an existing Announcement
            agent.delete('/api/announcements/' + announcementSaveRes.body._id)
              .send(announcement)
              .expect(200)
              .end(function (announcementDeleteErr, announcementDeleteRes) {
                // Handle announcement error error
                if (announcementDeleteErr) {
                  return done(announcementDeleteErr);
                }

                // Set assertions
                (announcementDeleteRes.body._id).should.equal(announcementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Announcement if not signed in', function (done) {
    // Set Announcement user
    announcement.user = user;

    // Create new Announcement model instance
    var announcementObj = new Announcement(announcement);

    // Save the Announcement
    announcementObj.save(function () {
      // Try deleting Announcement
      request(app).delete('/api/announcements/' + announcementObj._id)
        .expect(403)
        .end(function (announcementDeleteErr, announcementDeleteRes) {
          // Set message assertion
          (announcementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Announcement error error
          done(announcementDeleteErr);
        });

    });
  });

  it('should be able to get a single Announcement that has an orphaned user reference', function (done) {
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

          // Save a new Announcement
          agent.post('/api/announcements')
            .send(announcement)
            .expect(200)
            .end(function (announcementSaveErr, announcementSaveRes) {
              // Handle Announcement save error
              if (announcementSaveErr) {
                return done(announcementSaveErr);
              }

              // Set assertions on new Announcement
              (announcementSaveRes.body.name).should.equal(announcement.name);
              should.exist(announcementSaveRes.body.user);
              should.equal(announcementSaveRes.body.user._id, orphanId);

              // force the Announcement to have an orphaned user reference
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

                    // Get the Announcement
                    agent.get('/api/announcements/' + announcementSaveRes.body._id)
                      .expect(200)
                      .end(function (announcementInfoErr, announcementInfoRes) {
                        // Handle Announcement error
                        if (announcementInfoErr) {
                          return done(announcementInfoErr);
                        }

                        // Set assertions
                        (announcementInfoRes.body._id).should.equal(announcementSaveRes.body._id);
                        (announcementInfoRes.body.name).should.equal(announcement.name);
                        should.equal(announcementInfoRes.body.user, undefined);

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
      Announcement.remove().exec(done);
    });
  });
});
