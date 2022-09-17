const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json'); // <== Will be created later
const middlewares = jsonServer.defaults({
  static: './build',
});

const port = process.env.PORT || 9000; // <== You can change the port
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);
server.use(router);
server.listen(port, () => console.log(`server is running on  ${port}`));
