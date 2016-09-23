'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Schoolsubjects Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/schoolsubjects',
      permissions: '*'
    }, {
      resources: '/api/schoolsubjects/:schoolsubjectId',
      permissions: '*'
    }, {
      resources: '/api/subjectsinschool/:subjectsSchoolId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/schoolsubjects',
      permissions: ['get', 'post']
    }, {
      resources: '/api/schoolsubjects/:schoolsubjectId',
      permissions: ['get']
    }, {
      resources: '/api/subjectsinschool/:subjectsSchoolId',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/schoolsubjects',
      permissions: ['get']
    }, {
      resources: '/api/schoolsubjects/:schoolsubjectId',
      permissions: ['get']
    }, {
      resources: '/api/subjectsinschool/:subjectsSchoolId',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If Schoolsubjects Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Schoolsubject is being processed and the current user created it then allow any manipulation
  if (req.schoolsubject && req.user && req.schoolsubject.user && req.schoolsubject.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
