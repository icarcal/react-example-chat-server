const server = require('http').createServer();
const io = require('socket.io')(server);

let clients = [];

io.on('connection', (client) => {
  clients.push(client.id);

  client.join('general');

  client.on('message:toServer', (data) => {
    io.emit('message:toClient', data)
  });

  client.on('message:toGeneral', (data) => {
    io.to('general').emit('message:toGeneralClient');
  });

  client.on('disconnect', () => {
    const index = clients.indexOf(client.id);

    clients.splice(index, 1);
  });
})

server.listen(3001);
