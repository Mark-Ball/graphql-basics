# GraphQL Basics

## Most basic implementation - 1-file server

The 1-file server requires four components.

1. Import statements

    ```const { graphql, buildSchema } = require('graphql');```

2. Schema

    The schema defines what query can be sent to the server. In our case we are only permitting query requests (not mutation or subscription) and the only resolver function we will build will be called 'hello' and return a string.

    ```
    const schema = buildSchema(`
        type Query {
            hello: String
        }
    `);
    ```

3. Resolver

    The resolver function resolves a value for a field or type in a schema. Every field on every type is backed by a resolver. In this case we have a resolver for the 'hello' query, which returns 'Hello world!.

    ```
    const root = {
        hello: () => 'Hello world!',
    };
    ```

4. GraphQL listen setup

    Lastly, we must call the graphql function, passing the schema as the first argument, the query as the second argument, and the resolver as the third. We chain a .then to handle the response.

    ```
    graphql(schema, '{ hello }', root)
        .then(response => console.log(response));
    ```

## GraphQL with Express

Our goal is to integrate GraphQL with Express by setting up a single endpoint which will be used with GraphQL.

1. Import Express and graphqlHTTP

    ```
    const express = require('express');
    const graphqlHTTP = require('express-graphql');
    ```

2. Set up GraphQL at the endpoint and listen on the port. The schema and resolver are unchanged.

    ```
    const app = express();
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));
    app.listen(4000, () => console.log('Listening on Port 4000'));
    ```

We have set ```graphiql: true``` in our setup, which allows us to use the GraphiQL GUI at ```http://localhost:4000/graphql```.

## Passing arguments

The simplest possible implementation of passing arguments is to have our schema accept 1 argument, and have the resolver simply return the argument passed.

In our schema we will accept an argument called num, which is an Int and is non-nullable. The query will return an Int.
```
const schema = buildSchema(`
    type Query {
        number(num: Int!): Int
    }
`);
```

In our root variable (i.e. resolvers) we declare a resolver for number, which destructures num from the arguments passed on number, and returns that number.
```
const root = {
    number: ({ num }) => num
};
```

This enables you to write a query which passes in an integer argument called num.
```
{
    number(num: 3)
}
```

## Sending the query with Axios

So far, we have been writing our queries in the GraphiQL interface. For a real program, we will want to send our requests programmatically. One of the ways we can do this using methods already known to us is with axios.

To recreate our 'number' request from above, we will create a file called ```request.js``` in the root of the project to write our request in.

Import axios and we save the endpoint in a variable.

```Javascript
const axios = require('axios');
const endpoint = 'http://localhost:4000/graphql';
```

We save our query in a variable to make the syntax easier.

```Javascript
var query = (
    `{
        number(num: 4)
    }`
)
```

Now we can make our http request using axios and print the result.

```Javascript
axios({
  url: endpoint,
  method: 'post',
  data: {
    query: query
  }
}).then((result) => {
  console.log(result.data)
});
```

## Using variables

Instead of hardcoding the query with the num: 4, we want to use a variable in our query.

### In GraphiQL

We must name our query, which we did not have to do before and pass in the names of variables which we want to include. For now, we simply want to query the number. Therefore we have named the query ```number``` and indicated in the first line that we will be using a variable named ```$num``` which is a required Int. On line 2 we query the resolver called 'number' and pass in an argument called num, with the value specified in the Query Variables.

```
query Number($num: Int!){
	number(num: $num)
}
```

In the Query Variables we now declare the variable which will be used in place of ```$num```.

```
{
  "num": 4
}
```