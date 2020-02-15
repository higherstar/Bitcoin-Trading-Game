const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    createdDate: { type: Date, default: Date.now},
    status: { type: String, default: 'pending'},
    members: { type: Number, default: 1 },
    jackPot: { type: Number, default: 0},
    topUser: { type: String, default: ''}
})

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('room', schema);