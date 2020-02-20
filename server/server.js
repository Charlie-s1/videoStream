const express = require('express');
const app = express();
const fs = require('fs');
const up = require('express-fileupload');
const organise = require('./organise');
const path = require('path')

app.use(express.static(path.join(__dirname,'../pages')));
app.use(up());
//app.use(express.urlencoded());

app.post("/uploadFiles",async function(req,res){
  let dir = path.join(__dirname, `../pages/files/${req.body.folder}/`);
  if (!req.body.lv2){
    dir += req.body.lv1;
  }else{
    dir += `${req.body.lv1}/${req.body.lv2}`;
  }
  console.log(dir);
  organise.newDirs(req.body.folder,req.body.lv1,req.body.lv2)
  if (req.files.video.length > 1){
    for (file of req.files.video){
      fs.writeFile(`${dir}/${file.name}`, file.data, (err) => {
        if(err) return console.log(err);
        console.log("up");
      })
    }
    
    res.send(JSON.stringify(req.body.file));
  }else{
    fs.writeFile(`${dir}/${req.files.video.name}`, req.files.video.data, (err) => {
      if(err) return console.log(err);
      console.log("up");
    })
  }
  
  
});

app.get("/list",function(req,res){
  let location = path.join(__dirname, `../pages/files/${req.query.folder}`);

  fs.readdir(location, (err, files) => {
    res.send(JSON.stringify(files))
  })
});

app.listen(8080);
