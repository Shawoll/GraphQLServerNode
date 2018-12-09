const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphiql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.listen(4100);

// https://youtu.be/ed8SzALpx1Q?t=5385 lesson 16 graphql

