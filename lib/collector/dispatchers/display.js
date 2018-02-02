var DisplayDispatcher = function() {
};

DisplayDispatcher.prototype.process = function(data, req, valid) {
  if (valid === true) {
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
