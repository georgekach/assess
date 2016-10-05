'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Mediaresources Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/mediaresources',
      permissions: '*'
    }, {
      resources: '/api/mediaresources/:mediaresourceId',
      permissions: '*'
    }, {
      resources: '/api/mediarecourcesforteacher/:mendiaresourceTeacherId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/mediaresources',
      permissions: ['get', 'post']
    }, {
      resources: '/api/mediaresources/:mediaresourceId',
      permissions: ['get']
    }, {
      resources: '/api/mediarecourcesforteacher/:mendiaresourceTeacherId',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/mediaresources',
      permissions: ['get']
    }, {
      resources: '/api/mediaresources/:mediaresourceId',
      permissions: ['get']
    }, {
      resources: '/api/mediarecourcesforteacher/:mendiaresourceTeacherId',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If Mediaresources Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Mediaresource is being processed and the current user created it then allow any manipulation
  if (req.mediaresource && req.user && req.mediaresource.user && req.mediaresource.user.id === req.user.id) {
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
