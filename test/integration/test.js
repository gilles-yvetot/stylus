
/**
 * Module dependencies.
 */

var css = require('../../lib/css')
  , should = require('../../support/should')
  , basename = require('path').basename
  , fs = require('fs');

/**
 * Test the given `fixture`.
 *
 * @param {String} fixture
 */

function test(fixture) {
  var base = __dirname + '/fixtures/' + fixture
    , path =  base + '.in'
    , csspath = base + '.css';
  fs.readFile(path, 'utf8', function(err, str){
    if (err) throw err;
    css.render(str, { filename: path }, function(err, actual){
      if (err) throw err;
      fs.readFile(csspath, 'utf8', function(err, expected){
        if (err) throw err;
        if (actual != expected) {
          var msg = '"' + basename(path, '.in') + '" failed\n\n'
            + 'expected: \n' + expected + '\n\n'
            + 'actual: \n' + actual + '\n';
          throw new Error(msg);
        }
      });
    });
  });
  return test;
};

/**
 * Auto-load and test fixtures.
 */

fs.readdir(__dirname + '/fixtures', function(err, files){
  if (err) throw err;
  files.forEach(function(file){
    if (/\.in$/.test(file)) {
      test(basename(file, '.in'));
    }
  });
});