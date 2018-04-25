var compilersArr = require('../compilers.js');
var fs = require('fs');
var path = require('path');

var jsPath = path.join(__dirname, '../usercode/javascript/usercode.js');
var javaPath = path.join(__dirname, '../usercode/java/src/main/usercode.java');
var rubyPath = path.join(__dirname, '../usercode/ruby/src/usercode.rb');

module.exports = function(langId, fileName) {
  var lang = compilersArr[langId][0];

  var source = path.join(__dirname, '../usercode/' + fileName);
  var dest = compilersArr[langId][1];
  
  // var dest = path.join(__dirname, '../usercode/' + lang + '/usercode.js');

  fs.renameSync(source, dest);
}
