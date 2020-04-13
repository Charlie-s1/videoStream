const express = require('express');
const app = express();
const fs = require('fs');
const up = require('express-fileupload');
const organise = require('./organise');
const path = require('path');
const movieInfo = require('movie-info');
const movieArt = require('movie-art');


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
  let cat = ["Select..."];
  const exten = ["mkv","mp4","avi"];
  console.log(pathList[0]);
  
  if (pathList[0] == "Films"){
    let rawData = fs.readFileSync(path.join(__dirname,"../server/films.json"))
    files = JSON.parse(rawData);
    console.log(files);
    res.send({"files":files, "cat":cat});
  }
  else{

    fs.readdir(location, async (err, fileNames) => {
      if(err) return console.log(err);
      for (item of fileNames){
        const nameSplit = item.split(/[().\[\]]+/);
        if(pathList[0]=="TV" && exten.indexOf(nameSplit[nameSplit.length-1])!=-1){        
          let episode = {
            "title": nameSplit[0],
            "link" : `/files/${req.query.folder}/${item}`,
            "poster": movieArt(pathList[1],{type:'tv'})
          }
          files.push(episode);
        }
        else if(nameSplit.indexOf("txt")!=-1){}
        else{
          cat.push(item);
          console.log(files,cat);
        }  
      }
      res.send({"files":files, "cat":cat});  
    });
  }
 
  
    
});

app.get("/data", function(req,res){
  let dir = path.join(__dirname, `../pages/files/${req.param.path}`);
  const data = organise.getMeta(dir);
  res.send(data);
});

app.listen(8080);
