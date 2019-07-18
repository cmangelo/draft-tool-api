const express = require('express');

const PlayerController = require('../controllers/player.controller');

const router = express.Router();

router.get('/:positionId', PlayerController.findByPosition);

router.post('/positions/:groupId', PlayerController.uploadFile);

router.patch('/:playerId', PlayerController.updatePlayer);

module.exports = router;