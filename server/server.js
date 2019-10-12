const express = require('express');
const app = express();
const fs = require('fs');
const tv = require("./TVapi");
//const db = require('./db.js');


app.use(express.static('pages'));

// app.get("/getMessages", afunction(req,res){
//   try {
//     const mov = await db.getMessages(res);
//     fs.writeFile('app/webPages/walls/movies.json', mov, 'utf8',function(err){
//       if (err){
//         console.log("nope");
//       }else{
//         console.log("got messages");
//       }
//     });
//
//   } catch (e) {
//     console.error(e);
//     res.sendStatus(500);
//   }
// })
app.get("/list",function(req,res){
  fs.readdir(req.query.folder, (err, files) => {
    res.send(JSON.stringify(files))
  })
});

app.listen(8080);

//myserver UPDATE
