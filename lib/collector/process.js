var Collector = require('./collector'),
  StatsdDispatcher = require('./dispatchers/statsd'),
  RedisDispatcher = require('./dispatchers/redis'),
  DisplayDispatcher = require('./dispatchers/display');

var processor;

if (process.env.STATSD) {
  console.log('(processor) Using STATSD dispatcher.');
  processor = new StatsdDispatcher();
} else if (process.env.REDIS) {
  console.log('(processor) Using REDIS dispatcher.');
  processor = new RedisDispatcher();
} else {
  console.log('(processor) Using DISPLAY dispatcher.');
  processor = new DisplayDispatcher();
}

var collector = new Collector(processor);
collector.init();
