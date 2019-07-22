const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
    round: {
        type: Number,
        required: true
    }
});

const Round = mongoose.model('Round', roundSchema);

module.exports = Round;