const config = require("./config");
const films = require("./films");
const path = require("path");
const fs = require("fs");

async function getData(title,year){
    let thisMovie = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${config.key}&language=en-US&query=${title}&year=${year}&include_adult=false`);
    return thisMovie;
}

async function getFilmInfo(){
    const location = path.join(__dirname,"../pages/files/Films");

    let files = [];
    const exten = ["mkv","mp4", "avi"];

    fs.readdir(location,async (err,fileNames)=>{
        for (i of fileNames){
            const nameSplit = i.split(/[().\[\]]+/);      
            if (exten.indexOf(nameSplit[nameSplit.length-1])!=-1){
                let thisMovie = await (await getData(nameSplit[0],nameSplit[1])).json();
                thisMovie["link"] = `/files/Films/${i}`;
                thisMovie["quality"] = nameSplit[2];
                thisMovie["imageBase"] = "http://image.tmdb.org/t/p/w300_and_h450_bestv2"

                files.push(thisMovie.results[0]);
                console.log(thisMovie.results[0]);
                console.log("-----");
            }
        }
        fs.writeFile("server/films.json",JSON.stringify(files,null,4),(err)=>{
            if(err){
                console.log(err);
            }
        });
    });
}

getFilmInfo();