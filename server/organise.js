const fs = require('fs');

function newDirs(insert,dir){
  let folder = dir.split("/");
  let current = "pages/files/" + insert + "/";
  for (item of folder){
    item = item + "/";
    current += item;
    console.log(current);
    fs.mkdirSync(current);
  }


}

module.exports = {
  newDirs : newDirs
};
