var mvFileToFolder = require('./utils/mvFileToFolder.js');
var selectCompilingCommand = require('./utils/selectCompilingCommand.js');
var compilersArr = require('./compilers.js');

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
  var langId = parseInt(req.body.langid);

  mvFileToFolder(langId, 'usercode.js');

  var st = selectCompilingCommand(langId);

  // console.log('Executable statement has been built');
  exec(st, function(err, stdOut, stdErr) {
    if(err) {
      console.log('Some error occured.');
    } else if(stdErr) {
      console.log('stdErr: ' + stdErr);
    } else {
      console.log('stdOut: ' + stdOut);
    }

    var parsedOutput = JSON.parse(stdOut);

    var fileToRm = compilersArr[langId][1];
    fs.unlink(fileToRm, function(err) {
      if(err) {
        console.log(err);
      }
      res.status(200).json(parsedOutput);
    });
  });

});

app.listen(port, function() {
  console.log("Listening on port " + port);
});
