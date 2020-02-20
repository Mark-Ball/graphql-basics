const { graphql, buildSchema } = require('graphql');

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
graphql(schema, '{ hello }', root)
    .then(response => console.log(response));