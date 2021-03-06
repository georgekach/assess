'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Schoolclasses Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/schoolclasses',
      permissions: '*'
    }, {
      resources: '/api/schoolclasses/:schoolclassId',
      permissions: '*'
    }, {
      resources: '/api/classesinschool/:schoolclassSchoolId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/schoolclasses',
      permissions: ['get', 'post']
    }, {
      resources: '/api/schoolclasses/:schoolclassId',
      permissions: ['get']
    }, {
      resources: '/api/classesinschool/:schoolclassSchoolId',
      permissions: '*'
    }, {
      resources: '/api/seteacherforclass',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/schoolclasses',
      permissions: ['get']
    }, {
      resources: '/api/schoolclasses/:schoolclassId',
      permissions: ['get']
    }, {
      resources: '/api/classesinschool/:schoolclassSchoolId',
      permissions: '*'
    }, {
      resources: '/api/seteacherforclass',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If Schoolclasses Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Schoolclass is being processed and the current user created it then allow any manipulation
  if (req.schoolclass && req.user && req.schoolclass.user && req.schoolclass.user.id === req.user.id) {
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
