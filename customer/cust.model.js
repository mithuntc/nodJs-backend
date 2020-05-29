const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    sportsitem: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    name: { type: String, required: true },
    donation: { type: Number, required: false },
    
    full: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Customer', schema);