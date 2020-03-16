'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.name !== 'string' ||
      typeof data.authorName !== 'string' ||
      typeof data.releaseDate !== 'number') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the book item.',
    });
    return;
  }

  const id = event.pathParameters.bookUuid
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id
    },
    ExpressionAttributeNames: {
      '#bookName': 'name',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':authorName': data.authorName,
      ':releaseDate': data.releaseDate,
    },
    UpdateExpression: 'SET #bookName = :name, authorName = :authorName, releaseDate = :releaseDate',
    ReturnValues: 'ALL_NEW',
  };

  dynamoDb.update(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t update the book item.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};