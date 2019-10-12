const fs = require('fs');

function getList(folder){
  //files = [];
   console.log(fs.readdir(folder));
    // files.forEach(file => {
    //   //files.push(file);
    //   console.log(files,file);
    // });

}

module.exports = {
  getList : getList
};
