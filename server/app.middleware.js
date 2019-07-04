const api = require('./api');
const bodyParser = require('body-parser');
const cors = require('cors');

const setDbConnection = () => {
  console.log('DB connection will be setup');
};

const setMiddleware = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
};

const apiSetup = (app) => {
  app.use('/api/v1/', api);

  app.get('/', (req, res) => {
    res.send('api is ok');
  })
};

module.exports = {
  setDbConnection,
  setMiddleware,
  apiSetup
}

