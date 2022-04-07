const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
var index = require('./routes/index');
const port = 3001;
const app = express();
app.use(index);

const server = http.createServer(app);
server.listen(port, () => console.log(`listening on port ${port}`));
const io = socketIo(server, { cors: { origin: '*' } });
let interval;
io.on('connection', (socket) => {
  console.log('New Socket client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});
const getApiAndEmit = (socket) => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let formatampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  const response = hours + ':' + minutes + ':' + seconds + ' ' + formatampm;
  socket.emit('GetTime', response);
};
