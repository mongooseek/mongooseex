var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user');
var handler = new Handler();

router.get('/', handler.getAllFriends);

//Route to add some user to friends (send the proposition, add el. to 'friends' array of both users).
//router.put('/:id', handler.dealWithFriends);

//Route to add some user to friends (send the proposition, add el. to 'friends' array of both users).
//router.put('/add/:id', handler.addToFriends);

//Route to remove some user from friends (empty 'friends' array).
//router.put('/remove/:id', handler.removeFromFriends);

//Route to change friendship status (to required, pending or accepted).
//router.put('/change/:id', handler.changeFriendsStatus);

module.exports = router;