//Router for Rest API for posts.
var express = require('express');
var router = express.Router();
var Handler = require('../handlers/post');
var handler = new Handler();

router.get('/', handler.getAll);
router.get('/:id', handler.getById);
router.post('/', handler.createPost);
//router.put('/:id', handler.update);
router.delete('/:id', handler.remove);

module.exports = router;