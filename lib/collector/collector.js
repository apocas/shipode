var Tail = require('tail').Tail,
  Parser = require('../parser/parser'),
  Tools = require('../tools'),
  os = require('os');


var Collector = function(dispatchers) {
  this.parser = new Parser();
  this.dispatchers = dispatchers;
};


Collector.prototype.init = function() {
  var self = this;

  this.path = process.env.LOG_PATH || '/var/log/nginx/access.log';
  this.tail = new Tail(this.path);

  this.tail.on('line', function(data) {
    self.parser.parse(data, function(req) {
      var valid = Tools.isValid(req);
      for (var i = 0; i < self.dispatchers.length; i++) {
        self.dispatchers[i].process(data, req, valid);
      }
    });
  });

  this.tail.on('error', function(error) {
    console.log('(collector) TAIL ERROR: ', error);
  });

  console.log('(collector) Watching log: ' + this.path);
};

module.exports = Collector;
