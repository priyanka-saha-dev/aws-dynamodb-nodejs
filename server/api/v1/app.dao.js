const uuid = require('uuid');
const AWS = require('aws-sdk');
const { dynamoDBParams } = require('../../config');
const { AWSConfig } = require('../../config');

const uploadToS3 = (data) => {

  const s3 = new AWS.S3();
  const uuidv4 = uuid.v4();
  const bucketName = `node-sdk-data`;
  const filename = `data-${uuidv4}-sample.txt`;

  return new Promise((resolve, reject) => {

    console.log('starting upload : ', data);

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
          console.log('error while uploading data - ', error);
          reject({
            message: `Failed to upload data to ${bucketName} / ${filename}`,
            status: 500
          });
        });
    }



  });

};

const insertRecord = (record) => {

  AWS.config.update(AWSConfig);
  
  //const db = new AWS.DynamoDB();
  const dbClient = new AWS.DynamoDB.DocumentClient();

  return new Promise((resolve, reject) => {

    let params = {
      TableName: dynamoDBParams.TableName,
      Item: record
    };

    // createDynamoDB().then((response) => {

    // }).catch((error) => {

    // });

    dbClient.put(params, (error, response) => {
      if (error) {
        console.log('Failed to insert records - ', error);
        return reject({
          "message": `Data not inserted - ${error.message} `,
          "status": 200
        })
      } else {
        return resolve({
          "message": `Data inserted successfully`,
          "status": 200
        })
      }
    });

  });

};

const fetchRecords = () => {

};

const updateFlag = () => {

};

const deleteRecord = () => {

};

const createDynamoDB = () => {

  AWS.config.update(AWSConfig);
  
  const db = new AWS.DynamoDB();
  return new Promise((resolve, reject) => {
    db.createTable(dynamoDBParams, (error, response) => {
      if (error) {
        console.log('Error in table create - ', error);
        return reject({
          "message": `Table not created - ${error.message} `,
          "status": 200
        })
      } else {
        return resolve({
          "message": `Table created successfully`,
          "status": 200
        })
      }
    });
  });
}


module.exports = {
  uploadToS3,
  insertRecord,
  fetchRecords,
  updateFlag,
  deleteRecord,
  createDynamoDB
}