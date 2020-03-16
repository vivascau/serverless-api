'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body);
  
  if (typeof data.name !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: `Couldn't create book item. Invalid name field.`,
    });
    return;
  }

  if (typeof data.releaseDate !== 'number') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: `Couldn't create book item. Invalid release date.`,
    });
    return;
  }

  if (typeof data.authorName !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: `Couldn't create book item. Invalid author name.`,
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      name: data.name,
      releaseDate: data.releaseDate,
      authorName: data.authorName,
      createdAt: new Date().getTime(),
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create book item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};