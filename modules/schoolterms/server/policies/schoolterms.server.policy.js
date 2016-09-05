'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Schoolterms Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/schoolterms',
      permissions: '*'
    }, {
      resources: '/api/schoolterms/:schooltermId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/schoolterms',
      permissions: ['get', 'post']
    }, {
      resources: '/api/schoolterms/:schooltermId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/schoolterms',
      permissions: ['get']
    }, {
      resources: '/api/schoolterms/:schooltermId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Schoolterms Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Schoolterm is being processed and the current user created it then allow any manipulation
  if (req.schoolterm && req.user && req.schoolterm.user && req.schoolterm.user.id === req.user.id) {
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
