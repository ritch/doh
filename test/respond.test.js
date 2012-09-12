var respond = require('../lib/respond')();

test('respond should return html based on the error', function (done) {
  var res = {
    end: function (str) {
      if(str.indexOf('<h1>') < 0) fail('response should include html');
      done();
    }
  };
  
  respond(new Error('test error'), res);
})