# node-doh

upgrade any http(s) server with error handling via domains

![Hoomer](http://www.homersimpsonquotes.com/images/homer.gif)

## features

 - guarantees a request will receive a response when errors occur
 - handles any error during a request callback (no need for fn(err, res))
 - sends 500 with error message by default
 - default and custom error pages

## install

    npm install doh

![Error Screen](http://images.deploydapp.com/img/doh.png)

## usage

Add error handling to an existing server.

    var upgrade = require('doh').upgrade
      , server = require('http').createServer();
  
    server.on('request', function () {
      process.nextTick(function() {
        throw 'some error here'; // ends the response, returns an error page
      });
    });
  
    server.listen(3000);
  
    // call upgrade when you want
    // to start handling errors
    upgrade(server);

## crash only

By default `doh` handles errors on a domain and responds with an error page. Since node is crash only by design, you'll usually (if not always) want to `process.exit()` when an error occurs.

    upgrade(server).on('error', function(err, req, res) {
      // at this point the response has been sent
      // but we can still log out everything before we
      // restart the server
      
      console.error(err, req, res);
      process.exit();
    });

## options

You can pass an options object to `doh.upgrade(server, options)` to override default behavior.

 - `template` - path to an ejs error template. Passed `req`, `res`, and `err`. See `assets/error.html`.
 
## tests

    npm test

**note** - Since `doh` is entirely concerned with error handling, it requires a custom test runner that does not rely on `throw` for failures (see `test.js` for more).
 
 