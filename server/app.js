let express = require('express');
let app = express();
const appSvc = require('./app.middleware');

// create dynamodb connection
appSvc.setDbConnection();

// express middleware
appSvc.setMiddleware(app);

// api configuration
appSvc.apiSetup(app);

module.exports = app;