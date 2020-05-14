const path = require('path');
const fs = require('fs');
const movieInfo = require('movie-info');

async function createFilmJson(){
  let location = path.join(__dirname, "../pages/files/Films");
  
  let files = [];
  let cat = [];
  const exten = ["mkv","mp4","avi"];
  
  fs.readdir(location, async (err, fileNames) => {
    if(err) return console.log(err);
    for (item of fileNames){
      const nameSplit = item.split(/[().\[\]]+/);   
      if (exten.indexOf(nameSplit[nameSplit.length-1])!=-1){
        let thisMovie = await movieInfo(nameSplit[0],nameSplit[1]);
        thisMovie["link"] = `/files/Films/${item}`;
        thisMovie["quality"] = nameSplit[2];

        files.push(thisMovie);
        console.log(thisMovie.title);
        console.log(thisMovie.release_date);
        console.log(thisMovie.vote_average);
        
        
        
        
      }
      else if(nameSplit.indexOf("txt")!=-1){}
      else{
        cat.push(item);
      }  
    }
    fs.writeFile("server/films.json",JSON.stringify(files),function(err){
      if (err) console.log(err);
    })
    
    
  });
}

createFilmJson();
