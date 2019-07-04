const dao = require('./app.dao');

const insertRecord = () => {

};

const fetchRecords = () => {

};

const updateFlag = () => {

};

const deleteRecord = () => {

};

const uploadToS3Dummy = (req, res) => {

  let data = {
    "message": 'dummay data'
  };

  dao.uploadToS3(data)
    .then((response) => {
      res.status(response.status).send(response);
    }).catch((error) => {
      res.status(error.status).send(error);
    });

};

const uploadToS3 = (req, res) => {
  
  console.log('req : ', req.body);
    dao.uploadToS3(req.body)
      .then((response) => {
        res.status(response.status).send(response);
      }).catch((error) => {
        res.status(error.status).send(error);
      });
  
  };

module.exports = {
  updateFlag,
  insertRecord,
  fetchRecords,
  deleteRecord,
  uploadToS3,
  uploadToS3Dummy
}