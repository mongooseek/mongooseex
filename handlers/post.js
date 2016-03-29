//DB handler for post.
//Required dependency.
var mongoose = require('mongoose');

module.exports = function () {
    var Post = mongoose.model('post');

    //Handler to get all messages.
    this.getAll = function (req, res, next) {
        Post.find({}, {__v: 0}, function (err, posts) {
            if (err) {
                return next(err);
            }
            res.status(200).send(posts);
        });
    };

    //Handler to get a message by id of message.
    this.getById = function (req, res, next) {
        console.log(req.myName);
        console.log(req.params.id);
        res.status(200).send('GET posts');
    };

    //Handler to create a message.
    this.createPost = function (req, res, next) {
        var body = req.body;
        var post = new Post(body);
        post.save(function (err, user) {
            if (err) {
                return next(err);
            }
            delete user.pass;
            res.status(201).send(post);
        });
    };
}