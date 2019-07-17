const express = require('express');

const Player = require('../models/player.model');
const PlayerController = require('../controllers/player.controller');

const router = express.Router();

router.get('/:groupId', PlayerController.findByGroup);

router.post('/positions/:id', PlayerController.uploadFile);

router.patch('/:playerId', PlayerController.updatePlayer);

module.exports = router;