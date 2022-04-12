const mongoose = require('mongoose');

const playerSchemas = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address:String,
    team:String,
    salary:Number
});

module.exports = mongoose.model('Player', playerSchemas);