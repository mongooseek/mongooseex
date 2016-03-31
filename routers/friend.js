//Router for Rest API for friends.
var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user');
var handler = new Handler();

router.get('/', handler.getAllFriends);
router.get('/distance/:distance', handler.getAllFriends);
router.put('/:id', handler.update);

module.exports = router;