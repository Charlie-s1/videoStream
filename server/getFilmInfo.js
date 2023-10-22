const config = require("./config");
const films = require("./films");
const path = require("path");
const fs = require("fs");

async function getData(title,year){
    let thisMovie = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${config.key}&language=en-US&query=${title}&year=${year}&include_adult=false`);
    return thisMovie;
}
async function getGenres(){
    let genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${config.key}&language=en-US`);
    return genres
}

async function getFilmInfo(){
    const location = path.join(__dirname,"../pages/files/Films");

    let files = [];
    const exten = ["mkv","mp4", "avi"];

    fs.readdir(location,async (err,fileNames)=>{
        for (i of fileNames){
            const nameSplit = i.split(/[().\[\]]+/);      
            if (exten.indexOf(nameSplit[nameSplit.length-1])!=-1){
                let thisMovieRaw = await (await getData(nameSplit[0],nameSplit[1])).json();
                let thisMovie = thisMovieRaw.results[0];
                console.log(i);
                thisMovie["vidLink"] = `/files/Films/${i || null}`;
                thisMovie["quality"] = nameSplit[2];
                thisMovie["imageBase"] = "http://image.tmdb.org/t/p/w300_and_h450_bestv2"

                files.push(thisMovie);
                console.log(thisMovie);
                console.log("-----");
            }
        }
        const genreNames = await (await getGenres()).json();
        fs.writeFile("server/films.json",JSON.stringify(files,null,4),(err)=>{
            if(err){
                console.log(err);
            }
        });
        fs.writeFile("server/genres.json",JSON.stringify(genreNames,null,4),(err)=>{
            if(err){
                console.log(err);
            }
            console.log("created genres");
        });
    });
}

getFilmInfo();