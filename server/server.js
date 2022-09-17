const jsonServer = require('json-server');

const server = jsonServer.create();

const router = jsonServer.router('./db.json');

console.log(router);

const middlewares = jsonServer.defaults();

const port = process.env.PORT || 9000; // <== You can change the port
server.use(middlewares);
server.use(router);

server.listen(port);
