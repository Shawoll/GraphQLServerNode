const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

// model represents a collection in the database 
module.exports = mongoose.model('Book', bookSchema);