//DB handler for chat.
//Required dependency.
var mongoose = require('mongoose');

module.exports = function () {
    var Chat = mongoose.model('chat');

    //Handler to get all chat messages.
    this.getAll = function (req, res, next) {
        Chat.find({}, {__v: 0}, function (err, posts) {
            if (err) {
                return next(err);
            }
            res.status(200).send(posts);
        });
    };

    //Handler to get chat's message by id of message.
    this.getById = function (req, res, next) {
        Chat.find({owner: req.params.id}, {__v: 0}, function (err, post) {
            if (err) {
                return next(err);
            }
            res.status(200).send(posts);
        });
    };

    //Handler to create a message.
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