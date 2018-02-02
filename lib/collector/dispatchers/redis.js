var Parser = require('../../parser/parser'),
  Tools = require('../../tools'),
  Redis = require('redis');


var RedisDispatcher = function() {
  this.parser = new Parser();

  console.log('(dispatcher) Connecting to redis instance: ' + process.env.REDIS);
  this.redis = redis.createClient({
    'host': process.env.REDIS,
    'port': process.env.REDIS_PORT || 6379,
    'password': process.env.REDIS_PASSWORD || null,
    'db': process.env.REDIS_DB || null
  });
};

RedisDispatcher.prototype.process = function(req) {
  if (Tools.isValid(req)) {
    if (this.redis) {
      pub.publish(process.env.REDIS_CHANNEL_OK, JSON.stringify(req));
    }
  } else {
    console.log('(dispatcher) Discarding request:');
    console.log(req);
    if (this.redis) {
      pub.publish(process.env.REDIS_CHANNEL_NOK, JSON.stringify(req));
    }
  }
};

module.exports = RedisDispatcher;
