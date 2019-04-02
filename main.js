#!/usr/bin/env node

var child_process = require('child_process');
var collectorProcess;

function startCollector() {
  console.log('(shipode) Spawning collector process.');
  collectorProcess = child_process.fork(__dirname + '/lib/collector/process');

  setTimeout(function() {
    collectorProcess.kill('SIGHUP');
    startCollector();
  }, 3600 * 1000);
}


function exitHandler(options, err) {
  collectorProcess.kill('SIGHUP');
  process.exit();
}

process.on('exit', exitHandler.bind(null, {
  cleanup: true
}));

process.on('SIGINT', exitHandler.bind(null, {
  exit: true
}));

process.on('SIGUSR1', exitHandler.bind(null, {
  exit: true
}));
process.on('SIGUSR2', exitHandler.bind(null, {
  exit: true
}));

process.on('uncaughtException', exitHandler.bind(null, {
  exit: true
}));

console.log('(shipode) Shipper started.');
startCollector();
