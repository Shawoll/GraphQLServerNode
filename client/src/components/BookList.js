import React, { Component } from "react";
// to be implemented
// import logo from './logo.svg';
// import './App.css';
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return <div>loading books...</div>;
    } else {
      // map goes through the array and gives
      // an access  to the individual item with iteration
      // arrow function, to run function each time you get data from array
      return data.books.map(book => {
        // es6 function
        return <li key={book.id} onClick={e => { this.setState({ selected: book.id})}}>{book.name}</li>;
      });
    }
  }
  render() {
    return(
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
