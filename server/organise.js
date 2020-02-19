const fs = require('fs');

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

module.exports = {
  newDirs : newDirs
};
