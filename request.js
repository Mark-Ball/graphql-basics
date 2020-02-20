const axios = require('axios');
const endpoint = 'http://localhost:4000/graphql';
const fetch = require('node-fetch');

const num = 4;
var dice = 3;
var sides = 6;
var query = (
    `{
        number(num: 4)
    }`
)

// fetch(endpoint, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query: `query RollDice($dice: Int!, $sides: Int) {
//         rollDice(numDice: $dice, numSides: $sides)
//     }`,
//     variables: { dice, sides },
//   })
// })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));

axios({
  url: endpoint,
  method: 'post',
  data: {
    query,
    variables: { num: 5 }
  }
}).then((result) => {
  console.log(result.data)
});