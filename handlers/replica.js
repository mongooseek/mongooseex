//DB handler for replica.
//Required dependency.
var mongoose = require('mongoose');

module.exports = function () {
    var Replica = mongoose.model('replica');

    //Handler to get all chat messages.
    this.getAllWithOne = function (req, res, next) {
        var part1 = req.session.uId;
        var part2 = req.params.part2;
        Replica.find({$or: [{parts: [part1, part2]}, {parts: [part2, part1]}]}, {__v: 0}, function (err, replicas) {
            if (err) {
                return next(err);
            }
            console.log(replicas);
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

    this.setReplicasRead = function (req, res, next) {
        var body = req.body;
        var part1 = body.part1;
        var part2 = body.part2;
        Replica.update({parts: [part1, part2]}, {$set: {read: true}}, {multi: true}, function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).send(result);
        });
    };

    this.countUnreadReplicas = function (req, res, next) {
        var body = req.body;
        Replica.update({"sender.id": {$ne: req.body.part2}, parts: req.body.part2, read: false}, {$set: {read: false}}, {multi: true}, function (err, replicas) {
            if (err) {
                return next(err);
            }
            console.log(replicas);
            res.status(200).send(replicas);
        });
    };
}