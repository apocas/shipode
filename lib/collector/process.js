var Collector = require('./collector'),
  StatsdDispatcher = require('./dispatchers/statsd'),
  DisplayDispatcher = require('./dispatchers/display');

var processor;

if (process.env.STATSD) {
  console.log('Using STATSD dispatcher.');
  processor = new StatsdDispatcher();
} else {
  processor = new DisplayDispatcher();
}

var collector = new Collector(processor);
collector.init();
