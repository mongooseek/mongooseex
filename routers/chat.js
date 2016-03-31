//TODO - remove or refactor.
var express = require('express');
var router = express.Router();
var Handler = require('../handlers/chat');
var handler = new Handler();

router.get('/', handler.getAll);
router.get('/:id', handler.getById);
router.post('/', handler.createChat);
//router.put('/:id', handler.update);
//router.delete('/:id', handler.remove);

module.exports = router;