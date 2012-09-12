var upgrade = require('../lib/upgrade');
var http = require('http');
var request = require('request');
var server = http.createServer();
var SAMPLE_ERROR = 'testing 123';

test('server should respond with the sample error', function (done) {
  upgrade(server);

  server.on('request', function (req, res) {
    setTimeout(function () {
      throw SAMPLE_ERROR;
    }, 100);
  });

  server.listen(3000);

  server.on('listening', function () {
    request('http://localhost:3000', function (err, res, bdy) {
      if(bdy.indexOf(SAMPLE_ERROR) === -1) fail('server should return the SAMPLE_ERROR');
      done();
    });
  });
})