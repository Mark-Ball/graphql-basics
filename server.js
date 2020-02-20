const { buildSchema } = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');

// create schema
const schema = buildSchema(`
    type Query {
        hello: String
        second: String
    }
`);

// create a resolver function at the endpoint
const root = {
    hello: () => 'Hello world!',
    second: () => 'Second'
};

// set up graphql to return data when the endpoint is hit
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Listening on Port 4000'));