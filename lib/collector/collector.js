#!/usr/bin/env node

var Tail = require('tail').Tail,
  Parser = require('../parser/parser'),
  os = require('os');


var Collector = function(dispatcher) {
  this.parser = new Parser();
  this.dispatcher = dispatcher;
};


Collector.prototype.init = function() {
  var self = this;

  this.path = process.env.LOG_PATH || '/var/log/nginx/access.log';
  this.tail = new Tail(this.path);

  this.tail.on('line', function(data) {
    self.parser.parse(data, function(req) {
      self.dispatcher.process(req);
    });
  });

  this.tail.on('error', function(error) {
    console.log('TAIL ERROR: ', error);
  });

  console.log('(collector) Started!');
  console.log('(collector) Watching log: ' + this.path);
};

module.exports = Collector;
