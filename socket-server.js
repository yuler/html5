var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 3000});

// 广播方法
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
// 当接收到消息的时候。
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
        wss.broadcast(message);
    });
});


