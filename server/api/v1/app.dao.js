const uuid = require('uuid');
const AWS = require('aws-sdk');
const { dynamoDBParams } = require('../../config');
const { AWSConfig } = require('../../config');

AWS.config.update(AWSConfig);
const db = new AWS.DynamoDB();

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

  let params = {
    TableName: dynamoDBParams.TableName,
    Item: {
      name : {S: record.name},
      title : {S: record.title}
    }
  };

  console.log('inserting : ', params);
  return db.putItem(params, (error, response) => {
    if (error) {
      console.log('Failed to insert records - ', error);
      return Promise.reject({
        "message": `Data not inserted - ${error.message} `,
        "status": 200
      })
    } else {
      console.log('inserted successfully - ', response);
      return Promise.resolve({
        "message": `Data inserted successfully`,
        "status": 200
      })
    }
  }).promise();

  // return new Promise((resolve, reject) => {

  //   let params = {
  //     TableName: dynamoDBParams.TableName,
  //     Item: record
  //   };

  //   console.log('inserting : ', params);

  //   dbClient.put(params, (error, response) => {
  //     if (error) {
  //       console.log('Failed to insert records - ', error);
  //       return reject({
  //         "message": `Data not inserted - ${error.message} `,
  //         "status": 200
  //       })
  //     } else {
  //       console.log('inserted successfully - ', response);
  //       return resolve({
  //         "message": `Data inserted successfully`,
  //         "status": 200
  //       })
  //     }
  //   });

  // });

};

const fetchRecords = () => {

};

const updateFlag = () => {

};

const deleteRecord = () => {

};

const createDynamoDB = () => {


  return db.listTables({}).promise()
    .then((data) => {
      console.log('listtables - ', data);

      const exists = data.TableNames
        .filter(name => {
          return name === dynamoDBParams.TableName;
        }).length > 0;

      console.log('exists - ', exists);

      if (exists) {
        // return Promise.resolve({
        //   "message": "table already exists",
        //   "status": "200"
        // });
        return db.listTables({}).promise();
      }
      else {
        return db.createTable(dynamoDBParams).promise();
      }
    }).catch((error) => {

      console.log("list table error - ", error);
      return Promise.reject({
        "message": "list table error",
        "status": "200"
      });
    })

};


module.exports = {
  uploadToS3,
  insertRecord,
  fetchRecords,
  updateFlag,
  deleteRecord,
  createDynamoDB
}