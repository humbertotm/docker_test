var express = require('express');
var bodyParser = require('body-parser');
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
app.use(bodyParser());

app.post('/compile', upload.single('codefile'), function(req, res) {
  // console.log(__dirname + '/usercode');
  // pull image from docker hub
  var langId = parseInt(req.body.langid);

  var st = 'docker run --rm -v ' + __dirname + '/usercode:/usercode nodetest node /usercode/runtests.js';
  console.log('Executable statement has been built');
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
      res.status(200).send();
    });
  });

});

app.listen(port, function() {
  console.log("Listening on port " + port);
});
