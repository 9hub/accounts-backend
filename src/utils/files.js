var crypto = require('crypto');

exports.upload = function(req, res, next) {
  var file = req.file;
  res.json({
    file_name: file.filename,
    mime_type: file.mimetype
  });
};

exports.storage = {
  destination: function(req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function(req, file, cb) {
    var file_name_data = file.originalname.split('.');
    var type = file_name_data[file_name_data.length - 1];
    var file_name = crypto.createHash('md5')
    .update(file.originalname).digest('hex');
    cb(null, file_name + '.' + type);
  }
};

exports.storage_files = {
  destination: function(req, file, cb) {
    cb(null, 'public/files');
  },
  filename: function(req, file, cb) {
    var file_name_data = file.originalname.split('.');
    var type = file_name_data[file_name_data.length - 1];
    var file_name = crypto.createHash('md5')
    .update(file.originalname).digest('hex');
    cb(null, file_name + '.' + type);
  }
};
