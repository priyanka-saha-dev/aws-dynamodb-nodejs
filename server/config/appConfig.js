const appConfig = {
  port: process.env.PORT || 3000
};

const dbConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/keep'
};

const dynamoDBParams = {
  TableName: "DBParams",
  KeySchema: [
    { AttributeName: "name", KeyType: "HASH" },
    { AttributeName: "title", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [
    { AttributeName: "name", AttributeType: "S" },
    { AttributeName: "name", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

const AWSConfig = {
  region: "ap-south-1",
  endpoint: "http://localhost:3000"
};

module.exports = {
  appConfig,
  dbConfig,
  dynamoDBParams,
  AWSConfig
}