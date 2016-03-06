var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var http = require('http').Server(app);
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemoryStore = require('connect-mongo')(session);
var app = express();
var DB_HOST;
var DB_NAME;
var DB_PORT;
var connectionOptions;
var db;

var env = process.env.NODE_ENV;
require('./config/' + env);

DB_HOST = process.env.DB_HOST;
DB_NAME = process.env.DB_NAME;
DB_PORT = parseInt(process.env.DB_PORT, 10);

connectionOptions = {
    server: {poolSize: 5},
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    w: 1,
    j: true
};

mongoose.connect(DB_HOST, DB_NAME, DB_PORT, connectionOptions);
db = mongoose.connection;
db.once('connected', onConnection);
db.on('error', function (err) {
    throw err;
});

function onConnection() {
    var port = process.env.PORT || 3000;
    var sessionConfig = {
        mongooseConnection: db
    };
    var authStackMidlware = require('./helpers/auth');
    var postRouter;
    var UserHandler;
    var userRouter;
    var userHandler;

    port = parseInt(port, 10);

    require('./models/index');

    postRouter = require('./routers/post');
    UserHandler = require('./handlers/user');
    userRouter = require('./routers/user');
    userHandler = new UserHandler();
    app.use(express.static(__dirname + '/public'));
    app.use(cookieParser("myTestPython"));
    app.use(session({
        name: 'crm',
        key: "newWorldNewK",
        secret: '19asdf90zxcv20trewq202519asdf90zxcv20trewq',
        resave: false,
        saveUninitialized: false,
        store: new MemoryStore(sessionConfig)
    }));

    app.use(bodyParser.json());

    /*app.get('/', function (req, res, next) {
     res.sendFile(path.join(__dirname, 'index.html'));
     });*/

    app.post('/login', userHandler.login);

    app.use('/api/posts', authStackMidlware, postRouter);
    app.use('/api/users', /*authStackMidlware, */userRouter);

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

    app.listen(port, function () {
        console.log('server started at port', port);
    });
};


/*
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
 key: "newWorldNewK",
 secret: '19asdf90zxcv20trewq202519asdf90zxcv20trewq',
 resave: false,
 saveUninitialized: false,
 store: new MemoryStore(sessionConfig)
 }));
 app.use(bodyParser.json());

 app.post("/login", function (req, res) {
 if (req.session.uId || req.session.loggedIn) User.findOne({_id: req.session.uId}, {pass: 0}, function (err, doc) {
 console.log("Received a GET request for loginned _id: " + doc._id);
 res.send(doc);
 });
 else User.findOne({email: req.body.email, pass: req.body.pass}, {pass: 0}, function (err, doc) {
 console.log("Received a GET request for notloginned _id: " + doc._id);
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
 var userId = ((!req.params.id) ? (req.session.uId) : req.params.id);
 User.findOne({_id: userId}, function (err, doc) {
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

 app.listen(port, function () {
 console.log('listen on port', port);
 })
 /!*http.listen((port || 3000), function () {
 console.log('listening on:', port);
 });*!/
 */
