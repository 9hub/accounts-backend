var io = null;

var SocketManager = {};
SocketManager.init = function(http) {
  if (!http) {
    throw new Error('http is not defined');
  }
  io = require('socket.io')(http);
  SocketManager.comment();
};

//TODO Update chot statement
SocketManager.comment = function() {
  io.on('connection', function(socket) {
    console.log('SOCKET: new client!!');

    // socket.on('chat', function(msg) {
    //   console.log('message: ' + msg);
    //   // io.emit('chat', msg);
    // });
  });
};

SocketManager.emit = function(channel, data) {
  if (!channel) {
    throw new Error('channel is not defined');
  }
  if (!data) {
    throw new Error('data is not defined');
  }
  io.emit(channel, data);
};

module.exports = SocketManager;
