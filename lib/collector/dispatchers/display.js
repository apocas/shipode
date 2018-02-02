var Parser = require('../../parser/parser'),
  Tools = require('../../tools');


var DisplayDispatcher = function() {
  this.parser = new Parser();
};

DisplayDispatcher.prototype.process = function(req) {
  if (Tools.isValid(req)) {
    console.log('(dispatcher) Request:'.green);
  } else {
    console.log('(dispatcher) INVALID request:'.red);
  }
  console.log(req);
};

module.exports = DisplayDispatcher;
