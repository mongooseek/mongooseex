var express = require('express');

var router = express.Router();

router.use(function (req, res, next) {
    console.log('Post router');

    next();
});

router.get('/', function (req, res, next) {
    console.log(req.myName);
    res.status(200).send('GET posts');
});

router.get('/:id', function (req, res, next) {
    console.log(req.myName);
    console.log(req.params.id);
    res.status(200).send('GET posts');
});

router.post('/', function (req, res, next) {
    console.log(req.myName);
    res.status(200).send('POST posts');
});
module.exports = router;