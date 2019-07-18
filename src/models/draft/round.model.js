const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({

});

const Round = mongoose.model('Round', roundSchema);

module.exports = Round;