const express = require('express');
const app = express();
const fs = require('fs');
const up = require('express-fileupload');
const organise = require('./organise');

app.use(express.static('pages'));
app.use(up());
//app.use(express.urlencoded());

app.post("/upload",function(req,res){
  let option = req.body.organise == "" ? "": req.body.organise + "/"
  const dir = "pages/files/" + req.body.folder + "/" + option ;
  organise.newDirs(req.body.folder,req.body.organise);
  fs.writeFile(dir + req.files.video.name, req.files.video.data, (err) => {
    if (err) return console.log(err);

    console.log("up");
  })
  //res.send(JSON.stringify(req.body.file));

});

app.get("/list",function(req,res){
  fs.readdir(req.query.folder, (err, files) => {
    res.send(JSON.stringify(files))
  })
});

app.listen(8080);
