var Collector = require('./collector');
var StatsdDispatcher = require('./dispatchers/statsd');

var processor;

if (process.env.STATSD) {
  console.log('Using STATSD dispatcher.');
  processor = new StatsdDispatcher();
}

var collector = new Collector(processor);
collector.init();
