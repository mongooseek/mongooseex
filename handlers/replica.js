//DB handler for replica.
//Required dependency.
var mongoose = require('mongoose');

module.exports = function () {
    var Replica = mongoose.model('replica');

    //Handler to get all chat messages.
    this.getAllWithOne = function (req, res, next) {
        var part1 = req.session.uId;
        var part2 = req.params.part2;
        Replica.find({parts: [part1, part2]}, {__v: 0}, function (err, replicas) {
            if (err) {
                return next(err);
            }
            res.status(200).send(replicas);
        });
    };

    //Handler to get chat's message by id of message.
    this.getById = function (req, res, next) {
        Replica.find({owner: req.params.id}, {__v: 0}, function (err, post) {
            if (err) {
                return next(err);
            }
            res.status(200).send(posts);
        });
    };

    //Handler to create a message.
    this.createReplica = function (req, res, next) {
        var body = req.body;
        var replica = new Replica(body);
        replica.save(function (err, replica) {
            if (err) {
                return next(err);
            }
            res.status(201).send(replica);
        });
    };
}