//DB handler for user.
//Required dependency.
var mongoose = require('mongoose');
var sendMail = require("../helpers/mailSender");
module.exports = function () {
    var User = mongoose.model('user');
    var crypto = require('crypto');

    this.inviteFriend = function (req, res, next) {
        console.log('I am inviting!');
        var body;
        var email;
        var baseLink;
        var inviteToken;
        var user;
        var html;
        body = req.body;
        email = body.email;
        baseLink = req.headers.host + '/';
        inviteToken = crypto.randomBytes(10).toString('hex');
        html = 'http://' + baseLink + '#myApp/start/invite/' + inviteToken + email;
        user = new User({email: email, inviteToken: inviteToken, confirmed: true});
        console.log(user);
        user.save(function (err, user) {
            if (err) {
                return next(err);
            }
            sendMail(email, 'Invitation', html);
            res.status(201).send(user);
        });
    };
    //Handler is used within logout from site. It changes session.loggedIn to false.
    this.logout = function (req, res, next) {
        var message = {};
        req.session.loggedIn = false;
        res.json(message);

    };
    this.createInvitedUser = function (req, res, next) {
        console.log('I am creating invited user again!');
        var body;
        var user;
        var inviteToken;
        var shaSum = crypto.createHash('sha256');
        body = req.body;
        inviteToken = body.inviteToken;
        shaSum.update(body.pass);
        body.pass = shaSum.digest('hex');
        User.findOneAndUpdate(
            {
                inviteToken: inviteToken
            },
            {
                $set: body
            },
            {
                new: true
            },
            function (err, user) {
                req.session.uId = user._id;
                req.session.loggedIn = true;
                delete user.pass;
                res.status(200).send(user);
            }
        );
    };

    //Handler to create a user within registration.
    this.createUser = function (req, res, next) {
        console.log('I am creatin user again!');
        var body;
        var email;
        var baseLink;
        var confirmToken;
        var user;
        var shaSum = crypto.createHash('sha256');
        body = req.body;
        user = new User(body);
        email = body.email;
        baseLink = req.headers.host + '/';
        shaSum.update(body.pass);
        user.pass = shaSum.digest('hex');

        crypto.randomBytes(10, function (err, buf) {
            confirmToken = buf.toString('hex');
            user.confirmToken = confirmToken;
            html = 'http://' + baseLink + '#myApp/start/confirm/' + confirmToken;
            console.log(user);
            user.save(function (err, user) {
                if (err) {
                    return next(err);
                }
                sendMail(email, 'Confirm email', html);
                delete user.pass;
                req.session.uId = user._id;
                req.session.loggedIn = true;
                res.status(201).send(user);
            });
        });
    };
    this.confirmEmail = function (req, res, next) {
        var body;
        var shaSum = crypto.createHash('sha256');
        body = req.body;
        shaSum.update(body.pass);
        body.pass = shaSum.digest('hex');
        User.findOneAndUpdate(
            {
                confirmToken: body.confirmToken,
                email: body.email,
                pass: body.pass
            },
            {
                $set: {confirmToken: 'Hello World', confirmed: true}
            },
            {
                new: true
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
                delete user.confirmed;
                delete user.confirmToken;

                res.status(200).send(user);
            });
    };
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
            function (err, user) {
                delete user.pass;
                req.session.uId = user._id;
                req.session.loggedIn = true;
                res.send(user);
            }
        )
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
        if(req.session.isAdministrator) {
            User.findByIdAndRemove(id, function (err, user) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(user);
            });
        }
    };

    //Handler to get user within nn.
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
                    pass: body.pass, email: body.email, confirmed: true
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
                    if(user.role === 'admin') req.session.isAdministrator = true;
                    delete user.pass;

                    res.status(200).send(user);
                });
        }
    };
};