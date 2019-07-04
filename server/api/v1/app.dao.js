const uuid = require('uuid');
const AWS = require('aws-sdk');

// Create an S3 client
const s3 = new AWS.S3();

const uploadToS3 = (data) => {

  const uuidv4 = uuid.v4();
  const bucketName = `node-sdk-data`;
  const filename = `data-${uuidv4}-sample.txt`;

  return new Promise((resolve, reject) => {

    if (!data) {
      reject({
        message: 'Data is missing',
        status: 500
      });
    } else {

      s3.createBucket({ Bucket: bucketName }).promise()
        .then((resp) => {

          let objectParams = { Bucket: bucketName, Key: filename, Body: JSON.stringify(data) };

          s3.putObject(objectParams).promise().then((response) => {
            resolve({
              message: `Successfully uploaded data to ${bucketName} / ${filename}`,
              status: 200
            });
          });
        }).catch((error) => {
          reject({
            message: `Failed to upload data to ${bucketName} / ${filename}`,
            status: 500
          });
        });
    }
  });

};

const insertRecord = () => {

};

const fetchRecords = () => {

};

const updateFlag = () => {

};

const deleteRecord = () => {

};


module.exports = {
  uploadToS3,
  insertRecord,
  fetchRecords,
  updateFlag,
  deleteRecord
}