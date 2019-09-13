const fs = require('fs');

// 将base64编码转为图片并存储
async function base64Toimg(base64String, filename) {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
  const dataBuffer = Buffer.from(base64Data, 'base64');
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, dataBuffer, function(err) {
      if(err){
        console.error(err);
        return reject(err);
      }else{
        return resolve(filename);
      }
    });
  });
}

module.exports = {
  base64Toimg
};