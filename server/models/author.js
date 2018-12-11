const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: String,
    authorId: String
});

// model represents a collection in the database 
module.exports = mongoose.model('Author', authorSchema);