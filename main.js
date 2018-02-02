#!/usr/bin/env node

var child_process = require('child_process');


function startCollector() {
  console.log('Spawning collector process.');
  var collectorProcess = child_process.fork(__dirname + '/lib/collector/process');

  setTimeout(function() {
    collectorProcess.kill('SIGHUP');
    startCollector();
  }, 3600 * 1000);
}


console.log('Shipper started.');
startCollector();
