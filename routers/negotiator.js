var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user');
var handler = new Handler();

router.get('/', handler.findNegotiators);
router.get('/distance/:distance', handler.findNegotiators);

/*
 router.get('/:id', handler.getById);
 router.put('/:id', handler.update);
 router.delete('/:id', handler.remove);
 */

module.exports = router;