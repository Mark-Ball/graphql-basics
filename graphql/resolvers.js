const resolvers = {
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

module.exports = resolvers;