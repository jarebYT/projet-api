const app = require('./app');
const http = require('http');

const server = http.createServer(app);

const PORT = 3000;

server.on('listening',() => {
    console.log("Server listen on port : " + PORT)
})

server.listen(PORT);