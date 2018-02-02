module.exports = {
  isValid: function(req) {
    if (!req.remote_addr || req.remote_addr.indexOf(' ') !== -1 || !req.host || req.host.indexOf(' ') !== -1 || !req.http_method || req.http_method.indexOf(' ') !== -1 || !req.status || !req.remote_user) {
      return false;
    }

    if (req.cache && req.cache !== null && /\d/.test(req.cache)) {
      return false;
    }

    if (/\d/.test(req.http_method)) {
      return false;
    }

    return true;
  }
};
