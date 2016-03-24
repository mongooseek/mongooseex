//DB handler for user.
//Required dependency.
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
module.exports = function () {
    var User = mongoose.model('user');
    var crypto = require('crypto');

    this.findOneByEmail = function (req, res, next) {
        var body;
        var resetToken;
        var email = req.body.email;
        var tokenExpires = Date.now() + 3600000;
        crypto.randomBytes(31, function (err, buf) {
            resetToken = buf.toString('hex');
            body = {email: email, resetToken: resetToken, tokenExpires: tokenExpires};
            User.update({email: email}, {$set: body}, {new: true}, function (err, result) {
                /*req.session.tokenExpires = tokenExpires;
                 req.session.resetToken = resetToken;*/
                /*var smtpTransport = nodemailer.createTransport('SMTP', {
                 service: 'SendGrid',
                 auth: {
                 user: 'ihor.ilnytskyi@gmail.com',
                 pass: '//-ihaj2015'
                 }
                 });
                 var mailOptions = {
                 to: 'teerfeel@gmail.com',
                 from: 'me',
                 subject: 'Node.js Password Reset',
                 text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                 'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                 'http://' + 'localhost:3000' + '/reset/' + resetToken + '\n\n' +
                 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                 };
                 smtpTransport.sendMail(mailOptions, function (err) {
                 console.log('MAIL ERROR', err);
                 });*/

                var transporter = nodemailer.createTransport(
                    smtpTransport('smtps://ihor.ilnytskyi%40gmail.com://-ihaj2015@smtp.gmail.com')
                );
                transporter.verify(function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Server is ready to take our messages');
                    }
                });

                res.send(result);
            });
        });
    };

    this.resetPass = function (req, res, next) {
        /*var body;
         var resetToken;
         var email = req.body.email;
         var tokenExpires = Date.now() + 3600000;
         crypto.randomBytes(31, function (err, buf) {
         resetToken = buf.toString('hex');
         body = {email: email, resetToken: resetToken, tokenExpires: tokenExpires};
         User.update({email: email}, {$set: body}, {new: true}, function (err, result) {
         req.session.tokenExpires = tokenExpires;
         req.session.resetToken = resetToken;
         res.send(result);
         });
         });*/
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
        if (req.session.uId && req.session.loggedIn) {
            User.findOne({_id: req.session.uId}, {
                pass: 0,
                __v: 0
            }, function (err, doc) {
                console.log("Received a GET request for loginned _id: " + doc._id);
                res.send(doc);
            })
        }
        else {
            var body = req.body;
            var user = new User(body);
            var shaSum = crypto.createHash('sha256');
            shaSum.update(body.pass);
            body.pass = shaSum.digest('hex');
            console.log(body);
            User.findOne({pass: body.pass, email: body.email}, function (err, user) {
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