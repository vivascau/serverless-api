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
curl -X POST https://h73cfoye7g.execute-api.us-east-1.amazonaws.com/dev/book/add --data '{ "name": "A Book", "authorName": "AUTHOR", "releaseDate": 1584347539287 }'
```

### Update book

```bash
curl -X POST https://h73cfoye7g.execute-api.us-east-1.amazonaws.com/dev/book/651ecb60-676b-11ea-95e6-0b2095ad4823/update --data '{ "name": "Another Book", "authorName": "AUTHOR SECOND", "releaseDate": 1584347539287 }'
```

### Delete book

```bash
curl -X POST https://h73cfoye7g.execute-api.us-east-1.amazonaws.com/dev/book/3d15b040-6769-11ea-8e8d-7d5919b459e9/delete
```

### Get book

```bash
curl -X GET https://h73cfoye7g.execute-api.us-east-1.amazonaws.com/dev/book/651ecb60-676b-11ea-95e6-0b2095ad4823
```

### Get all books

```bash
curl -X GET https://h73cfoye7g.execute-api.us-east-1.amazonaws.com/dev/books
```

