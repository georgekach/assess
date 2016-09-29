'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Classexercises Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/classexercises',
      permissions: '*'
    }, {
      resources: '/api/classexercises/:classexerciseId',
      permissions: '*'
    }, {
      resources: '/api/classexercisesforclass/:classExClassId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/classexercises',
      permissions: ['get', 'post']
    }, {
      resources: '/api/classexercises/:classexerciseId',
      permissions: ['get']
    }, {
      resources: '/api/classexercisesforclass/:classExClassId',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/classexercises',
      permissions: ['get']
    }, {
      resources: '/api/classexercises/:classexerciseId',
      permissions: ['get']
    }, {
      resources: '/api/classexercisesforclass/:classExClassId',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If Classexercises Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Classexercise is being processed and the current user created it then allow any manipulation
  if (req.classexercise && req.user && req.classexercise.user && req.classexercise.user.id === req.user.id) {
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
