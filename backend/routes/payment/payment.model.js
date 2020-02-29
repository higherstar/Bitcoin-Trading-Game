const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    amount: { type: Number, required: true },
    betCoin: { type : Number, default: 0 },
    paymentToken: { type: String, required: true },
    customerID: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    totalScore: { type: Number, default: 0}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('payment', schema);
