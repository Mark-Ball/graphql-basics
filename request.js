const axios = require('axios');
const endpoint = 'http://localhost:4000/graphql';
const fetch = require('node-fetch');

var dice = 3;
var sides = 6;
var query = (
    `{
        number(num: 4)
    }`
)

// `query RollDice($dice: Int!, $sides: Int) {
//   rollDice(numDice: $dice, numSides: $sides)
// }`;

// fetch(endpoint, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query,
//     variables: { dice, sides },
//   })
// })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));

axios({
  url: endpoint,
  method: 'post',
  data: {
    query: query
  }
}).then((result) => {
  console.log(result.data)
});