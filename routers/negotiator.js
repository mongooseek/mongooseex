//TODO - remove or refactor.
var express = require('express');
var router = express.Router();
var Handler = require('../handlers/user');
var handler = new Handler();

router.get('/', handler.findNegotiators);
router.get('/distance/:distance', handler.findNegotiators);

module.exports = router;