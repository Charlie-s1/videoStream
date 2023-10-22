const express = require('express');
const app = express();
const fs = require('fs');
const organise = require('./organise');
const path = require('path');
const movieArt = require('movie-art');


app.use(express.static(path.join(__dirname,'../pages')));

/**
 * 
 */
app.get("/list",async function(req,res){
  let location = path.join(__dirname, `../pages/files/${req.query.folder}`);
  const pathList = req.query.folder.split('/');
  let files = [];
  let cat = [];
  const exten = ["mkv","mp4","avi"];
  
  if (pathList[0] == "Films"){
    let rawData = fs.readFileSync(path.join(__dirname,"../server/films.json"))
    files = JSON.parse(rawData);
    res.send({"files":files, "cat":cat});
  }
  else{
    fs.readdir(location, async (err, fileNames) => {
      if(err) return console.log(err);
      for (item of fileNames){
        const nameSplit = item.split(/[().\[\]]+/);
        if(exten.indexOf(nameSplit[nameSplit.length-1])!=-1){        
          let episode = {
            "quality": nameSplit[2],
            "title": nameSplit[0],
            "link" : `/files/${req.query.folder}/${item}`,
            // "poster": movieArt(pathList[1],{type:'tv'})
            "poster": null
          }
          files.push(episode);
        }
        else if(nameSplit.indexOf("srt")!=-1){
          files.push(item);
        }
        else if(nameSplit.indexOf("txt")!=-1){}
        else{
          cat.push(item);
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

app.get("/genres",function(req,res){
  let dir = path.join(__dirname, "../server/genres.json");
  fs.readFile(dir,(err,data)=>{
    if(!err){
      res.send(data);
    }
  })
})

console.log("videoStream running on 8080")
app.listen(8080);
