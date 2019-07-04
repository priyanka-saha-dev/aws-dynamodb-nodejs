const router = require('express').Router();
const routes = require('./v1');

router.use('/', routes);

module.exports = router;