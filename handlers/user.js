//DB handler for user.
//Required dependency.
var mongoose = require('mongoose');

module.exports = function () {
    var User = mongoose.model('user');
    var crypto = require('crypto');

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
        User.find({}, {pass: 0}, function (err, users) {
            if (err) {
                return next(err);
            }

            res.status(200).send(users);
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
            console.log(req.session.uId, req.session.loggedIn);
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
                console.log('body', body);
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

                delete user.pass;

                res.status(200).send(user);
            });
        }
    };

    //Handler is used within logout from site. It changes session.loggedIn to false.
    this.logout = function (req, res, next) {
        User.findOne({_id: req.session.uId}, {}, function (err, user) {
            if (err) {
                return next(err);
            }
            req.session.loggedIn = false;
            res.status(200).end();
        });
    }
};