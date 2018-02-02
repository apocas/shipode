var Collector = require('./collector'),
  StatsdDispatcher = require('./dispatchers/statsd'),
  RedisDispatcher = require('./dispatchers/redis'),
  DisplayDispatcher = require('./dispatchers/display');

var dispatchers = [];

if (process.env.STATSD) {
  console.log('(processor) Using STATSD dispatcher.');
  dispatchers.push(new StatsdDispatcher());
}
if (process.env.REDIS) {
  console.log('(processor) Using REDIS dispatcher.');
  dispatchers.push(new RedisDispatcher());
}

if(dispatchers.length === 0) {
  console.log('(processor) Using DISPLAY dispatcher.');
  dispatchers.push(new DisplayDispatcher());
}


var collector = new Collector(dispatchers);
collector.init();
