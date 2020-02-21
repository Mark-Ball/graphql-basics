const { buildSchema } = require('graphql');

const gqlSchema = buildSchema(`
    type Query {
        hello: String
        quoteOfTheDay: String
        random: Float!
        rollDice(numDice: Int!, numSides: Int): [Int]
        number(num: Int!): Int
    }
`);

module.exports = gqlSchema