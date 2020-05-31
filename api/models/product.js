const mongoose = require('mongoose');

const productSchemas = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address:String,
    donation:String,
    mobile:Number,
    sports: String
});

module.exports = mongoose.model('Product', productSchemas);