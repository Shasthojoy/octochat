var settings = require('../settings.js').loadSettings();
var redis = require('redis-url');

/**
 * @return {Object} A client for Redis.
 *
 * Get a redis client to octocache
 */
exports.client = function() {
  return redis.connect(settings.redisurl);
};
