var Collector = require('./collector'),
  StatsdDispatcher = require('./dispatchers/statsd'),
  DisplayDispatcher = require('./dispatchers/display');

var processor;

if (process.env.STATSD) {
  console.log('(processor) Using STATSD dispatcher.');
  processor = new StatsdDispatcher();
} else {
  console.log('(processor) Using DISPLAY dispatcher.');
  processor = new DisplayDispatcher();
}

var collector = new Collector(processor);
collector.init();
