const app = require('./app');
const http = require('http');

const server = http.createServer(app);// creer le serveur apache, qui n'existe pas de base avec node.js

const PORT = 3000;// port du serveur

server.on('listening',() => {
    console.log("Server listen on port : " + PORT)// on mets le serveur en ecoute en permanence
})

server.listen(PORT);//on appelle la fonction listen