const aws = require("aws-sdk");

aws.config.update(
    {
        "accessKeyId": "AKIA6RR6JYR7A52GNOFW",
        "secretAccessKey": "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",
        "region": "ap-south-1"
        //"endpoint": "http://localhost:3000"
    }
)
var awsdb = new aws.DynamoDB();

awsdb.createTable({
    TableName: 'myTbl',
    AttributeDefinitions: [
        { AttributeName: 'name', AttributeType: 'S' },
    ],
    KeySchema: [
        { AttributeName: 'name', KeyType: 'HASH' }
    ],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
}, function (err, data) {
    if (err)
        console.log(err, err.stack); // an error occurred
    else {
        awsdb.listTables(function (err, data) {
            console.log(data)
        });
    }
});