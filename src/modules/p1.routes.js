import express from 'express';

module.exports = function(app) {
  var module = express();
  app.use('/p1', module);
};
