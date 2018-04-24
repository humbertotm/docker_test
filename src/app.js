var express = require('express');
var exec = require('child_process').exec;
var fs = require('fs');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/usercode')
  },
  filename: function (req, file, cb) {
    cb(null, 'usercode.js')
  }
});
var upload = multer({ storage: storage });

var app = express();
var port = 3000;

// app.use(express.static(__dirname));

app.post('/compile', upload.single('codefile'), function(req, res) {
  // console.log(__dirname + '/usercode');
  var st = 'docker run --rm -v ' + __dirname + '/usercode:/usercode nodetest node /usercode/usercode.js';
  exec(st, function(err, stdOut, stdErr) {
    if(err) {
      console.log('Some error occured.');
    }

    console.log('stdOut: ' + stdOut);
    console.log('stdErr: ' + stdErr);
    fs.unlink(__dirname + '/usercode/usercode.js', function(err) {
      if(err) {
        console.log(err);
      }
    });
  });

});

app.listen(port, function() {
  console.log("Listening on port " + port);
});
