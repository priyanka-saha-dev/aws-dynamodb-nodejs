const appConfig = {
  port: process.env.PORT || 3000
};

const dbConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/keep'
};

const dynamoDBParams = {
  TableName: "DBParams",
  AttributeDefinitions: [
    { AttributeName: "name", AttributeType: "S" },
    { AttributeName: "title", AttributeType: "S" }
  ],
  KeySchema: [
    { AttributeName: "name", KeyType: "HASH" },
    { AttributeName: "title", KeyType: "RANGE" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

// [default]
// aws_access_key_id=AKIA6RR6JYR7A52GNOFW
// aws_secret_access_key=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

const AWSConfig = {
  "accessKeyId": "AKIA6RR6JYR7A52GNOFW",
  "secretAccessKey": "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",
  "region": "ap-south-1"
  //"endpoint": "http://localhost:3000"
};

module.exports = {
  appConfig,
  dbConfig,
  dynamoDBParams,
  AWSConfig
}