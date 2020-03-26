const fs = require('fs');
const meta = require('ffmetadata')

function newDirs(folder, lv1, lv2){
  let dir = `pages/files/${folder}/${lv1}`;
  if (!fs.existsSync(dir)){
    fs.mkdir(dir, (err) => {
      if(err) return console.log(err);
    });
    
    if (lv2){
      fs.mkdir(`${dir}/${lv2}`, (err) => {
        if(err) return console.log(err);
      });
    }
  }
}

function getMeta(file){
  console.log(file);
  
  meta.read(file, function(err, data) {
    if (err) console.error("Error reading metadata", err);
    else console.log(data);
  });
}

module.exports = {
  newDirs : newDirs,
  getMeta : getMeta
};
