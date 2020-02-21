const express = require('express');
const graphqlHTTP = require('express-graphql');

const gqlSchema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const dbConnect = require('./database/connectMongo');

const app = express();

dbConnect('mongodb://localhost/express-graphql');

app.use('/graphql', graphqlHTTP({
    schema: gqlSchema,
    rootValue: resolvers,
    graphiql: true
}));
app.listen(4000, () => console.log('Listening on Port 4000'));