const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    roomId: { type: String, default: '111' },
    playerName: { type: String, required: true },
    score: { type: Number, default: 0 }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Crypto', schema);
