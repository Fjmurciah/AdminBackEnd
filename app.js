require('dotenv').config();
const Server = require('./models/server');

console.log('Iniciando Servidor')
const server = new Server();
server.listen();