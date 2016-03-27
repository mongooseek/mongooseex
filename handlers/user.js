//DB handler for user.
//Required dependency.
var mongoose = require('mongoose');
var sendMail = require("../helpers/mailSender");
module.exports = function () {
    var User = mongoose.model('user');
    var crypto = require('crypto');

    this.generateAndSendResetLink = function (req, res, next) {
        var email;
        var baseLink;
        var resetToken;
        var tokenExpires;
        var html;
        var body;
        email = req.body.email;
        baseLink = req.headers.host + '/';
        tokenExpires = Date.now() + 3600000;
        crypto.randomBytes(10, function (err, buf) {
            resetToken = buf.toString('hex');
            html = 'http://' + baseLink + '#myApp/start/newpass/' + resetToken;
            console.log(html);
            body = {email: email, resetToken: resetToken, tokenExpires: tokenExpires};
            User.update({email: email}, {$set: body}, {new: true}, function (err, result) {
                sendMail(email, 'Get new pass', html);
                res.send(result);
            });
        });
    };

    this.resetPass = function (req, res, next) {
        var body = req.body;
        console.log(body);
        var shaSum = crypto.createHash('sha256');
        shaSum.update(body.pass);
        body.pass = shaSum.digest('hex');
        User.findOneAndUpdate(
            {
                resetToken: body.resetToken, tokenExpires: {$gte: Date.now()}
            },
            {
                $set: {resetToken: 'Hello world', pass: body.pass}
            },
            {
                new: true
            },
            function(err, user){
                delete user.pass;
                req.session.uId = user._id;
                req.session.loggedIn = true;
                res.send(user);
            }
        )
    };
    //Handler to create a user within registration.
    this.createUser = function (req, res, next) {
        console.log('I am creatin user!');
        var body = req.body;
        var user = new User(body);
        var shaSum = crypto.createHash('sha256');

        shaSum.update(body.pass);
        user.pass = shaSum.digest('hex');

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }

            delete user.pass;
            req.session.uId = user._id;
            req.session.loggedIn = true;
            res.status(201).send(user);
        });
    };
    //Handler to get all users from DB.
    this.getAll = function (req, res, next) {
        var query;
        var distance;
        var distanceInMeters;
        var myCoordinates;
        distance = req.params.distance;
        console.log('distance', distance);
        if (distance) {
            myCoordinates = req.session.location;
            distanceInMeters = distance * 1000;
            query = {
                location: {
                    $near: {
                        $geometry: {type: "Point", coordinates: myCoordinates},
                        //$minDistance: 0, - because we could do it without value of min distance in this case;
                        $maxDistance: distanceInMeters
                    }
                }
            }
        } else {
            query = {}
        }
        User.find(query,
            {
                pass: 0,
                __v: 0
            },
            function (err, users) {
                console.log('I am in location query');
                if (err) {
                    return next(err);
                }

                res.status(200).send(users);

            });
    };

    this.getAllFriends = function (req, res, next) {
        var query;
        var distance;
        var distanceInMeters;
        var myCoordinates;
        var uId;
        var status;
        distance = req.params.distance;
        uId = req.session.uId;
        status = 'accepted';
        if (distance) {
            myCoordinates = req.session.location;
            distanceInMeters = distance * 1000;
            query = {
                friends: {
                    $elemMatch: {status: status, _id: uId}
                },
                location: {
                    $near: {
                        $geometry: {type: "Point", coordinates: myCoordinates},
                        //$minDistance: 0, - because we could do it without value of min distance in this case;
                        $maxDistance: distanceInMeters
                    }
                }
            }
        } else {
            query = {
                friends: {$elemMatch: {status: status, _id: uId}}
            }
        }
        User.find(query,
            {
                pass: 0,
                __v: 0
            },
            function (err, friends) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(friends);
            })
    };

    this.findNegotiators = function (req, res, next) {
        var query;
        var distance;
        var distanceInMeters;
        var myCoordinates;
        var uId;
        distance = req.params.distance;
        uId = req.session.uId;
        if (distance) {
            myCoordinates = req.session.location;
            distanceInMeters = distance * 1000;
            query = {
                negotiators: uId,
                location: {
                    $near: {
                        $geometry: {type: "Point", coordinates: myCoordinates},
                        //$minDistance: 0, - because we could do it without value of min distance in this case;
                        $maxDistance: distanceInMeters
                    }
                }
            }
        } else {
            query = {
                negotiators: uId
            }
        }
        User.find(query, {pass: 0}, function (err, negotiators) {
            if (err) {
                console.log(one);
                return next(err);
            }
            res.status(200).send(negotiators);
        })
    };

    this.addToFriends = function (req, res, next) {
        var id = req.params.id;
        var friends = req.body.friends;
        User.findOneAndUpdate(id, {$set: friends}, function (err, doc) {
            if (err) {
                return next(err);
            }
            res.status(200).send(doc);
        })
    };

    //Handler to update users.
    this.update = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;

        User.findByIdAndUpdate(id, {$set: body}, {new: true}, function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });
    };

    //Handler to get user by his id.
    this.getById = function (req, res, next) {
        var userId = ((!req.params.id) ? (req.session.uId) : req.params.id);

        User.findById(userId, {pass: 0}, function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });
    };

    //Handler to remove user from db.
    this.remove = function (req, res, next) {
        var id = req.params.id;

        User.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });
    };

    //Handler to get user within login.
    this.login = function (req, res, next) {
        console.log(req.body);
        if (req.session.uId && req.session.loggedIn) {
            User.findOne({_id: req.session.uId}, {
                pass: 0,
                __v: 0
            }, function (err, doc) {
                console.log("Received a GET request for loginned _id: " + doc._id);
                res.send(doc);
            })
        } else {
            var body = req.body;
            var user = new User(body);
            var shaSum = crypto.createHash('sha256');
            shaSum.update(body.pass);
            body.pass = shaSum.digest('hex');
            console.log(body);
            User.findOne(
                {
                    pass: body.pass, email: body.email
                },
                {
                    pass: 0
                },
                function (err, user) {
                    if (err) {
                        return next(err);
                    }

                    if (!user) {
                        err = new Error('Bad request');
                        err.status = 400;

                        return next(err);
                    }

                    req.session.uId = user._id;
                    req.session.loggedIn = true;
                    req.session.location = user.location;

                    delete user.pass;

                    res.status(200).send(user);
                });
        }
    };

    //Handler is used within logout from site. It changes session.loggedIn to false.
    this.logout = function (req, res, next) {
        var message = {};
        req.session.loggedIn = false;
        res.json(message);

    };
}
;