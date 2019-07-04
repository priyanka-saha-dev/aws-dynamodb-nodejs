const dao = require('./app.dao');

const insertRecord = (req, res) => {

  dao.createDynamoDB()
    .then((response) => response.status)
    .then((status) => {
      if(status && status === 200) {
        return dao.insertRecord(req.body);
      } else {
        return res.status(status).send(`Failed to create`);
      }
    })
    .then((response) => res.status(response.status).send(response))
    .catch((error) => res.status(error.status).send(error));

  // dao.insertRecord(req.body)
  //   .then((response) => {
  //     res.status(response.status).send(response);
  //   }).catch((error) => {
  //     res.status(error.status).send(error);
  //   });
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