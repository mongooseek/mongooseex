var mongoose = require('mongoose');

module.exports = function () {
    var Chat = mongoose.model('chat');

    this.getAll = function (req, res, next) {
        Chat.find({}, {__v: 0}, function (err, posts) {
            if (err) {
                return next(err);
            }
            res.status(200).send(posts);
        });
    };

    this.getById = function (req, res, next) {
        Chat.find({owner: req.session.uId}, {__v: 0}, function (err, post) {
            if (err) {
                return next(err);
            }
            res.status(200).send(posts);
        });
    };

    this.createChat = function (req, res, next) {
        var body = req.body;
        var chat = new Chat(body);
        chat.save(function (err, user) {
            if (err) {
                return next(err);
            }
            res.status(201).send(chat);
        });
    };
}