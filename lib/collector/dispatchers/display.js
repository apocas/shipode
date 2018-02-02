var Parser = require('../../parser/parser'),
  Tools = require('../../tools');


var DisplayDispatcher = function() {
  this.parser = new Parser();
};

DisplayDispatcher.prototype.process = function(req) {
  if (Tools.isValid(req)) {
    if (process.env.ALL) {
      console.log('(dispatcher) Request:');
      console.log(req);
    }
  } else {
    console.log('(dispatcher) INVALID request:');
    console.log(req);
  }
};

module.exports = DisplayDispatcher;
