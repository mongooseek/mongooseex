var express = require('express');
var router = express.Router();
var Handler = require('../handlers/replica');
var handler = new Handler();

router.get('/:part1', handler.getAll);
//router.get('/:id', handler.getById);
router.post('/', handler.createReplica);
//router.put('/:id', handler.update);
//router.delete('/:id', handler.remove);

module.exports = router;