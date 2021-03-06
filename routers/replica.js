//Router for Rest API for posts.
var express = require('express');
var router = express.Router();
var Handler = require('../handlers/replica');
var handler = new Handler();

router.get('/:part2', handler.getAllWithOne);
//router.get('/:id', handler.getById);
router.post('/', handler.createReplica);
//router.put('/:id', handler.update);
//router.delete('/:id', handler.remove);

module.exports = router;