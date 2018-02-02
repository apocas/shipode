#!/usr/bin/env node

var Tail = require('tail').Tail,
  Parser = require('./lib/parser'),
  Tools = require('../../tools'),
  os = require('os'),
  SDC = require('statsd-client');


var StatsdDispatcher = function() {
  this.parser = new Parser();

  console.log('Connecting to statsd instance: ' + STATSD);
  this.statsd = new SDC({
    host: STATSD
  });
};

StatsdDispatcher.prototype.process = function(req) {
  if (Tools.isValid(req)) {
    if (this.statsd) {
      this.processStatsd(req);
    }
  } else {
    console.log('Discarding request:');
    console.log(req);
    if (this.statsd) {
      this.counter('http', 'parser.nok', 1);
    }
  }
};


StatsdDispatcher.prototype.counter = function(key, sub, value) {
  this.statsd.counter(key + '.' + process.env.STATSD_DOMAIN + '.' + sub, value);
  if (process.env.STATSD_SUBDOMAIN) {
    this.statsd.counter(key + '.' + process.env.STATSD_SUBDOMAIN + '.' + sub, value);
  }
};

StatsdDispatcher.prototype.timing = function(key, sub, value) {
  this.statsd.timing(key + '.' + process.env.STATSD_DOMAIN + '.' + sub, value);
  if (process.env.STATSD_SUBDOMAIN) {
    this.statsd.timing(key + '.' + process.env.STATSD_SUBDOMAIN + '.' + sub, value);
  }
};

StatsdDispatcher.prototype.processStatsd = function(req) {
  //this.statsd.counter('http.requests.' + req.host.replace('www.', '').replace(/"/g, '').replace(/\./g, '_'), 1);
  this.counter('http', 'requests', 1);

  if (req.status >= 200 && req.status < 300) {
    this.counter('http', 'codes.2xx', 1);
  } else if (req.status >= 300 && req.status < 400) {
    this.counter('http', 'codes.3xx', 1);
  } else if (req.status >= 400 && req.status < 500) {
    this.counter('http', 'codes.4xx', 1);
  } else if (req.status >= 500 && req.status < 600) {
    this.counter('http', 'codes.5xx', 1);
  } else {
    this.counter('http', 'codes.xxx', 1);
  }

  if (req.http_method == 'GET') {
    this.counter('http', 'verbs.get', 1);
  } else if (req.http_method == 'POST') {
    this.counter('http', 'verbs.post', 1);
  } else if (req.http_method == 'OPTIONS') {
    this.counter('http', 'verbs.options', 1);
  } else if (req.http_method == 'DELETE') {
    this.counter('http', 'verbs.delete', 1);
  } else {
    this.counter('http', 'verbs.other', 1);
  }

  if (req.body_bytes_sent) {
    this.counter('http', 'protocol.bytes', req.body_bytes_sent);
  }

  if (req.request_time !== undefined && req.request_time !== null) {
    this.timing('http', 'protocol.requesttime', parseFloat(req.request_time));
  }
  if (req.upstream_response_time !== undefined && req.upstream_response_time !== null) {
    this.timing('http', 'protocol.upstreamtime', parseFloat(req.upstream_response_time));
  }

  if (req.cache !== undefined) {
    if (req.cache === null || req.cache.indexOf('-') >= 0) {
      req.cache = '-';
    }
    this.counter('http', 'cache.' + req.cache, 1);
  }
};

module.exports = StatsdDispatcher;
