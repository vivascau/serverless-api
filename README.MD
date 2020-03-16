# Serverless api example

Using aws + DynamoDB

## Setup

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

## Usage

You can create, retrieve, update, or delete books with the following commands:

### Create a Book

```bash
curl -X POST https://XXXXXXXX.execute-api.us-east-1.amazonaws.com/dev/book/add --data '{ "name": "A Book", "authorName": "AUTHOR", "releaseDate": 1584347539287 }'
```


