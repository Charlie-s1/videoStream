const express = require('express');
const app = express();
const fs = require('fs');
const up = require('express-fileupload');
const organise = require('./organise');
const path = require('path')
const movieInfo = require('movie-info');

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

app.get("/list",async function(req,res){
  let location = path.join(__dirname, `../pages/files/${req.query.folder}`);
  const pathList = req.query.folder.split('/');
  let files = [];
  const exten = ["mkv","mp4","avi"];
  console.log(pathList);
  
  fs.readdir(location, async (err, fileNames) => {
    if(err) return console.log(err);
    for (item of fileNames){
      console.log(item);
      
      const nameSplit = item.split(/[()\[\]]+/);
      if (pathList[0] == "Films" && exten.indexOf(nameSplit)){
        console.log("start", nameSplit);
        let thisMovie = await movieInfo(nameSplit[0],nameSplit[1]);
        thisMovie["link"] = `${location}/${item}`;
        files.push(thisMovie);
      }else{
        files = JSON.stringify(fileNames);
      }  
    }
    res.send(files);
    
  });
  
  
});

app.get("/data", function(req,res){
  let dir = path.join(__dirname, `../pages/files/${req.param.path}`);
  const data = organise.getMeta(dir);
  res.send(data);
});

app.listen(8080);
