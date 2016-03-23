var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user');
var handler = new Handler();

router.get('/', handler.getAllFriends);
router.get('/distance/:distance', handler.getAllFriends);

module.exports = router;