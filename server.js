const { buildSchema } = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');

// create schema
const schema = buildSchema(`
    type Query {
        hello: String
        quoteOfTheDay: String
        random: Float!
        rollDice(numDice: Int!, numSides: Int): [Int]
        number(num: Int!): Int
    }
`);

// create a resolver function at the endpoint
const root = {
    hello: () => 'Hello world!',
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
        return Math.random();
    },
    rollDice: ({ numDice, numSides }) => {
        const arr = new Array(numDice).fill(1);
        return arr.map(_ => 1 + Math.floor(Math.random() * (numSides || 6)));
    },
    number: ({ num }) => num
};

// set up graphql to return data when the endpoint is hit
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Listening on Port 4000'));