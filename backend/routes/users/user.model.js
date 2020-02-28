const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    name: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    paymentTokenID: { type: String, required: false},
    signature: {type: String, default: ''}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
