module.exports = {
  isValid: function(req) {
    if (!req.remote_addr || req.remote_addr.indexOf(' ') !== -1 || !req.host || req.host.indexOf(' ') !== -1 || !req.http_method || req.http_method.indexOf(' ') !== -1 || !req.status || req.remote_user === undefined) {
      return false;
    }

    if (/\d/.test(req.http_method)) {
      return false;
    }

    if(req.request_time !== null && req.request_time !== undefined && req.upstream_response_time !== null && req.upstream_response_time !== undefined && isNaN(req.request_time) && isNaN(req.upstream_response_time)) {
      return false;
    }

    if(req.cache && /\d/.test(req.cache)) {
      return false;
    }

    return true;
  }
};
