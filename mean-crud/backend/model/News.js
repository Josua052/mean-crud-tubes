const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let News = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    phone_number: {
        type: Number
    },
    picture: {
        type: String
    }
}, {
    collection: 'news'
});

module.exports = mongoose.model('News', News);
