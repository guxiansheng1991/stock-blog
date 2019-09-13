const path = require('path');

const uploadFileAbsolutePath = path.join(__dirname, '../public');
const uploadFileRelativePath = '/upload/';
const uploadFilePath = path.join(uploadFileAbsolutePath, uploadFileRelativePath);

module.exports = {
  uploadFileRelativePath: uploadFileRelativePath,
  uploadFilePath: uploadFilePath
};