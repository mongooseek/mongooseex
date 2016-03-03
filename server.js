var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemoryStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost:27017/usersall');
db = mongoose.connection;
var sessionConfig = {
    mongooseConnection: db
};
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    pass: String,
    location: String,
    dateOfBirth: Date,
    role: String,
    authorized: Boolean,
    confirmed: Boolean
});

mongoose.model('User', UserSchema);

var User = mongoose.model('User');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(cookieParser("myTestPython"));
app.use(session({
    name: 'crm',
    key: "myTestPython",
    secret: '1q2w3e4r5tdhgkdfhgejflkejgkdlgh8j0jge4547hh',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore(sessionConfig)
}));
app.use(bodyParser.json());

app.post("/login", function (req, res) {
    console.log('session', req.session);
    console.log('session view', req.session.view);
    console.log((req.session.store));
    User.findOne({email: req.body.email, pass: req.body.pass}, {pass: 0}, function (err, doc) {
        console.log("Received a GET request for _id: " + doc._id);
        req.session.uId = doc._id;
        req.session.loggedIn = true;
        res.send(doc);
    });
});

// DB ROUTES
app.get('/api/users', function (req, res, next) {
    var err;

    if (!req.session || !req.session.loggedIn) {
        err = new Error('Forbidden');
        err.status = 403;

        return next(err);
    }
    next();
}, function (req, res) {
    var id = req.params.id;
    User.findById(id, {pass: 0}, function (err, user) {
        if (err) {
            return next(err);
        }
        console.log(user);
        res.status(200).send(user);
    });
});

app.post('/api/users', function (req, res, next) {
    var err;

    db.if(!req.session || !req.session.loggedIn)
    {
        err = new Error('Forbidden');
        err.status = 403;

        return next(err);
    }
    next();
}, function (req, res) {
    console.log('session', req.session);
    console.log('session view', req.session.view);
    console.log('Received a POST request: hello world')
    var body = req.body;
    var user = new User(body);
    user.save(function (err, user) {
        if (err) {
            console.log(err);
            return next(err);
        }
        console.log(body.firstName);
        delete user.pass;
        res.status(201).send(user);
    });
});

app.get('/api/users/:id', function (req, res, next) {
    var err;

    if (!req.session || !req.session.loggedIn) {
        err = new Error('Forbidden');
        err.status = 403;

        return next(err);
    }
    next();
}, function (req, res) {
    console.log('id from request1000', req.params.id);
    var id = (req.params.id == 0) ? req.session.uId : req.params.id;
    User.findOne({_id: id}, function (err, doc) {
        res.send(doc);
    });
});

app.delete('/api/users/:id', function (req, res) {
    console.log('Received a DELETE request for _id: ' + req.params.id);
    User.remove({_id: req.params.id}, function (err, doc) {
        res.send({_id: req.params.id});
    });
});

app.put('/api/users/:id', function (req, res) {
    console.log('Received an UPDATE request for _id: ' + req.params.id);
    User.update({_id: req.params.id}, req.body, function (err) {
        res.send({_id: req.params.id});
    });
});

app.use(function (err, req, res, next) {
    var status = err.status || 500;

    if (process.env.NODE_ENV === 'production') {
        res.status(status).send({error: err.message});
        console.error(err.message + '\n' + err.stack);
    } else {
        res.status(status).send({error: err.message + '\n' + err.stack});
        console.error(err.message + '\n' + err.stack);
    }
});

var port = 3000;

app.listen(port);
console.log('server on ' + port);