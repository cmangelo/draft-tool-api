const mongoose = require('mongoose');

const pickSchema = new mongoose.Schema({

});

const Pick = mongoose.model('Pick', pickSchema);

module.exports = Pick;