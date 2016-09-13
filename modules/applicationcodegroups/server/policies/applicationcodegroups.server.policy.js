'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Applicationcodegroups Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/applicationcodegroups',
      permissions: '*'
    }, {
      resources: '/api/applicationcodegroups/:applicationcodegroupId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/applicationcodegroups',
      permissions: ['get', 'post']
    }, {
      resources: '/api/applicationcodegroups/:applicationcodegroupId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/applicationcodegroups',
      permissions: ['get']
    }, {
      resources: '/api/applicationcodegroups/:applicationcodegroupId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Applicationcodegroups Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Applicationcodegroup is being processed and the current user created it then allow any manipulation
  if (req.applicationcodegroup && req.user && req.applicationcodegroup.user && req.applicationcodegroup.user.id === req.user.id) {
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
