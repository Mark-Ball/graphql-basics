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