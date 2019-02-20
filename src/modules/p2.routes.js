import express from 'express';

module.exports = function(app) {
  var module = express();
  app.use('/p2', module);
};
