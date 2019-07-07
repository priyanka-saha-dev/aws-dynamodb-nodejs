const api = require('./api');
const bodyParser = require('body-parser');
const cors = require('cors');

const setDbConnection = () => {
  console.log('DB connection will be setup');

  // db.listTables({}).promise()
  //   .then(data => data.TableNames.filter((name) => name === dynamoDBParams.TableName).length > 0)
  //   .then(exists => db.createTable(dynamoDBParams).promise())
  //   .then(response => console.log('response is - ', response))
  //   .catch((error) => console.log("list table error - ", error));

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

