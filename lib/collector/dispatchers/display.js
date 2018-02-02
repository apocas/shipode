var Parser = require('../../parser/parser'),
  Tools = require('../../tools');


var DisplayDispatcher = function() {
  this.parser = new Parser();
};

DisplayDispatcher.prototype.process = function(req) {
  if (Tools.isValid(req)) {
    console.log(req);
  } else {
    console.log('Discarding request:'.red);
    console.log(req);
  }
};

module.exports = DisplayDispatcher;
