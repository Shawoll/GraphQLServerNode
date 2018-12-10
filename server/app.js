const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connection string to the mongo db
mongoose.connect('mongodb://your-connection-string',
    { useNewUrlParser: true });

// since conncection is established, console message is written
mongoose.connection.once('open', () => {
    console.log('connected to the database');
});

app.use('/graphiql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.listen(4100);

// https://youtu.be/ed8SzALpx1Q?t=5385 lesson 16 graphql
// nodemon app -> command line for running instance of node 
// npm install mongoose

// mutation {
//   addBook(name: "Some Other Book", genre: "Matrix", authorId: "5c0ecf5ba867ca240c131bff") {
//     name
//     genre	
//   }
// },

// {
//   books {
//     name
//     genre
//     author {
//       name
//       age
//     }
//   }
// }

// {
//   authors {
//     name
//     age
//     books {
//       name 
//     }
//   }
// }


