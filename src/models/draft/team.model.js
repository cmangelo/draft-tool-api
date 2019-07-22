const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    owner: {
        type: String
    },
    draftPosition: {
        type: Number
    }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;