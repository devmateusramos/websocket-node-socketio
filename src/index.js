import express from 'express';
import http from 'http';

import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static(__dirname + '/public'));

io.on('connect', (socket) => {
  io.to(socket.id).emit({
    status: true,
    message: 'conexão estabelecida com o servidor',
  });

  socket.on('teste', (res) => {
    console.log('mensagem recebida nesse momento:', res);

    socket.broadcast.emit('teste', res);
  });
});

app.get('/', (req, res) => {
  res.render('index.html');
});

server.listen(3333, () => {
  console.log('Servidor iniciado porta', 3333);
});
