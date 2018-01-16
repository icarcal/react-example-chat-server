const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', (client) => {
  client.on('message:toServer', (data) => {
    io.emit('message:toClient', data)
  });
})

server.listen(3001);
