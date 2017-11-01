const express = require('express');
// Load the SDK for JavaScript
const AWS = require('aws-sdk');
AWS.config.update({
  region: "us-east-1"
});

// Load credentials and set region from JSON file
//AWS.config.loadFromPath('/Users/farhad/.aws/config.json');

var dynamodb = new AWS.DynamoDB();

var app = express();

app.get('/create', function(req,res){
  var params = {
      TableName : "Movies",
      KeySchema: [
          { AttributeName: "year", KeyType: "HASH"},  //Partition key
          { AttributeName: "title", KeyType: "RANGE" }  //Sort key
      ],
      AttributeDefinitions: [
          { AttributeName: "year", AttributeType: "N" },
          { AttributeName: "title", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10
      }
  };

  dynamodb.createTable(params, function(err, data) {
      if (err) {
          console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
      }
  });

 console.log('requested /');
 res.send('I am here!');
});

app.listen(3000, () => console.log('app is started.'));
