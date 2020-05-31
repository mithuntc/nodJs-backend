const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    order_type: String,
    order_value: Number
});

module.exports = mongoose.model('Order', orderSchema);