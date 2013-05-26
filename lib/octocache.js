var settings = require('../settings.js').loadSettings();
var redis = require('redis-url');

/**
 * This returns a client for Redis
 */
exports.octocache = redis.connect(settings.redisUrl);
