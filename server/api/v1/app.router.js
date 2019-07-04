const router = require('express').Router();
const ctrl = require('./app.controller');

router.get('/', ctrl.fetchRecords);
router.post('/', ctrl.insertRecord);
router.put('/', ctrl.updateFlag);
router.delete('/', ctrl.deleteRecord);

router.get('/s3/upload', ctrl.uploadToS3);
router.post('/s3/upload', ctrl.uploadToS3);

module.exports = router;