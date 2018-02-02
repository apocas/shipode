var redis = require('redis');


var RedisDispatcher = function() {
  console.log('(dispatcher) Connecting to redis instance: ' + process.env.REDIS);
  this.redisp = redis.createClient({
    'host': process.env.REDIS,
    'port': process.env.REDIS_PORT || 6379,
    'password': process.env.REDIS_PASSWORD || null,
    'db': process.env.REDIS_DB || null
  });
};

RedisDispatcher.prototype.process = function(data, req, valid) {
  if (valid === true) {
    if (this.redisp) {
      this.redisp.publish(process.env.REDIS_CHANNEL_OK || 'shipodeok', JSON.stringify(req));
    }
  } else {
    console.log('(dispatcher) Discarding request:');
    console.log(req);
    if (this.redisp) {
      this.redisp.publish(process.env.REDIS_CHANNEL_NOK || 'shipodenok', JSON.stringify(req));
    }
  }
};

module.exports = RedisDispatcher;
