/**
 * Dependencies
 */

var fs = require('fs')
  , ejs = require('ejs')
  , DEFAULT_TEMPLATE = __dirname + '/../assets/error.html'
  , template;

/**
 * Create a responder function based on the given `options`.
 *
 * Options:
 *
 *    `template` - path to an ejs template. Passed `req`, `res`, and `err`.
 *
 */

module.exports = function (options) {
  options = options || {};
  return function (err, res, req, fn) {
    readTemplate(options.template || DEFAULT_TEMPLATE, function () {
      var rendered = ejs.render(template, {err: err, res: res, req: req});
      try {
        res.setHeader('Content-Type', 'text/html');
        res.end(rendered);
        fn();
      } catch(e) {
        // XXX - shouldnt have to catch anything here
      }
    });
  }
}

/**
 * Read the template from disk and store it in a local variable.
 */

function readTemplate(path, fn) {
  if(template) return fn(template);
  
  fs.readFile(path, function (err, data) {
    template = data.toString();
    fn(template);
  });
}