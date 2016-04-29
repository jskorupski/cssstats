
var request = require('request');
var q = require('q');

var getCss = require('get-css');

module.exports = {

  getCssFromLink: function(link) {

    var deferred = q.defer();

    request({ url: link, timeout: 5000 }, function(error, response, body) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(body);
      }
    });

    return deferred.promise;

  },

  getCssFromUrl: function(url, ua) {

    var deferred = q.defer();

    var newCookieJar = request.jar();
    var options =  {
      jar: newCookieJar,
      gzip: true,
      timeout: 5000,
      strictSSL: false,
      followAllRedirects: true,
      gzip: true,
      agentOptions: {
        rejectUnauthorized: false
      }
    };
    
    if (ua) {
      options.headers = { 'User-Agent': ua };
    }

    getCss(url, options)
      .then(function(response) {
        deferred.resolve(response);
      })
      .catch(function(error) {
        deferred.reject(error);
      });

    return deferred.promise;

  }

};

