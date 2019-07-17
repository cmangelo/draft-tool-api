const express = require('express');

const Player = require('../models/player.model');
const PlayerController = require('../controllers/player.controller');

const router = express.Router();

router.post('/positions/:id', PlayerController.uploadFile);

module.exports = router;