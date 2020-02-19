const express = require('express');
const app = express();
const fs = require('fs');
const up = require('express-fileupload');
const organise = require('./organise');

app.use(express.static('pages'));
app.use(up());
//app.use(express.urlencoded());

app.post("/uploadFiles",async function(req,res){
  let dir = `pages/files/${req.body.folder}`
  if (!req.body.lv2){
    dir = `pages/files/${req.body.folder}/${req.body.lv1}`;
  }else{
    dir = `pages/files/${req.body.folder}/${req.body.lv1}/${req.body.lv2}` ;
  }
  console.log(dir);
  if (req.files.video.length > 1){
    await organise.newDirs(req.body.folder,req.body.lv1,req.body.lv2)
    for (file of req.files.video){
      fs.writeFile(`${dir}/${file.name}`, file.data, (err) => {
        if(err) return console.log(err);
    
        console.log("up");
      })
    }
    
    res.send(JSON.stringify(req.body.file));
  }
  
  
});

app.get("/list",function(req,res){
  fs.readdir(req.query.folder, (err, files) => {
    res.send(JSON.stringify(files))
  })
});

app.listen(8080);
