const graphql = require('graphql');
const _ = require('lodash');

// graphQL ojbects 
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// sample / dummy data
var books = [
    { name: 'Name 1', id: '1', genre: 'sci-fi', authorId: '1' },
    { name: 'Name 2', id: '2', genre: 'drama', authorId: '2' },
    { name: 'Name 3', id: '3', genre: 'comedy', authorId: '3' },
    { name: 'Name 4', id: '4', genre: 'anime', authorId: '4' },
    { name: 'Name 6', id: '5', genre: 'anime', authorId: '1' },
    { name: 'Name 7', id: '6', genre: 'anime', authorId: '2' },
    { name: 'Name 8', id: '7', genre: 'anime', authorId: '3' },
    { name: 'Name 9', id: '8', genre: 'anime', authorId: '4' },
    { name: 'Name 10', id: '9', genre: 'anime', authorId: '1' },
    { name: 'Name 11', id: '10', genre: 'anime', authorId: '3' }
];
var authors = [
    { name: 'Author1', id: '1', age: 22 },
    { name: 'Author2', id: '2', age: 24 },
    { name: 'Author3', id: '3', age: 30 },
    { name: 'Author4', id: '4', age: 55 }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(authors, { id: parent.authorId })
            }
        }
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // in this case filter, because author can have many books - graphql searches them for us
                return _.filter(books, { authorId: parent.id })
            }
        }
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                // code to get data from db / data source 
                // console.log(typeof(args.id));
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) { 
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery
});