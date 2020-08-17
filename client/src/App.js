import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// import logo from './logo.svg';
// import './App.css';

// when you are getting < token, that means you are returning html not a json

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphiql"
});

class App extends Component {
  render() {
    return (
      // { client here } beacuse we want to add data in react dynamicaly
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Shoping cart</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

