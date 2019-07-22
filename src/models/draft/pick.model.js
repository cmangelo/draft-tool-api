const mongoose = require('mongoose');

const pickSchema = new mongoose.Schema({
    pick: {
        type: Number,
        required: true
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Player'
    },
    round: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Round'
    }
});

const Pick = mongoose.model('Pick', pickSchema);

module.exports = Pick;