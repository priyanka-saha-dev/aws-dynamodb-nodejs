const app = require('../app');
const appConfig = require('../config').appConfig;

const port = appConfig.port;
const server = require('http').createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});