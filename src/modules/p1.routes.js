import express from 'express';
var multer  = require('multer');
var files_utils = require('../utils/files');
var import_utils = require('../utils/import');

var upload = multer({
  dest: 'public/images',
  storage:  multer.diskStorage(files_utils.storage)
});

var upload_files = multer({
  dest: 'public/files',
  storage:  multer.diskStorage(files_utils.storage_files)
});

module.exports = function(app) {
  var module = express();

  // images
  module.post('/photos/upload', upload.single('avatar'),
    files_utils.upload
  );
  module.post('/files/upload', upload_files.single('avatar'),
    files_utils.upload
  );

  module.post('/files/read', import_utils.excel);

  app.use('/p1', module);
};
