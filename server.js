var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var socket = require('socket.io')(server);

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemoryStore = require('connect-mongo')(session);
var path = require('path');

var DB_HOST;
var DB_NAME;
var DB_PORT;
var connectionOptions;
var db;

global.connectedPeople = {};

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
    var PostHandler;
    var postRouter;
    var postHandler;
    var UserHandler;
    var userRouter;
    var userHandler;
    var ReplicaHandler;
    var replicaRouter;
    var replicaHandler;
    var NegotiatorHandler;
    var negotiatorRouter;
    var negotiatorHandler;
    var FriendHandler;
    var friendRouter;
    var friendHandler;

    port = parseInt(port, 10);

    require('./models/index');

    PostHandler = require('./handlers/post');
    postRouter = require('./routers/post');
    postHandler = new PostHandler();
    UserHandler = require('./handlers/user');
    userRouter = require('./routers/user');
    userHandler = new UserHandler();
    ReplicaHandler = require('./handlers/replica');
    replicaRouter = require('./routers/replica');
    replicaHandler = new ReplicaHandler();


    NegotiatorHandler = require('./handlers/user');
    negotiatorRouter = require('./routers/negotiator');
    negotiatorHandler = new NegotiatorHandler();

    FriendHandler = require('./handlers/user');
    friendRouter = require('./routers/friend');
    friendHandler = new FriendHandler();

    friendRouter = require('./routers/friend');

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

    app.use(bodyParser.json({limit: '2mb'}));

    /*app.get('/', function (req, res, next) {
        res.sendFile(path.join(__dirname, 'index.html'));
    });*/

    app.post('/login', userHandler.login);
    app.post('/logup', userHandler.createUser);
    app.post('/confirm', userHandler.confirmEmail);
    app.post('/logout', userHandler.logout);
    app.post('/reset', userHandler.generateAndSendResetLink);
    app.post('/newpass', userHandler.resetPass);
    app.post('/invite', userHandler.inviteFriend);
    app.post('/invitation', userHandler.createInvitedUser);
    app.post('/unread', replicaHandler.countUnreadReplicas);

    app.use('/api/posts', authStackMidlware, postRouter);
    app.use('/api/users', authStackMidlware, userRouter);
    app.use('/api/replicas', authStackMidlware, replicaRouter);
    app.use('/api/negotiators', authStackMidlware, negotiatorRouter);
    app.use('/api/friends', authStackMidlware, friendRouter);

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
    require('./helpers/sockets')(socket);

    server.listen(port, function () {
        console.log('server started at port', port);
    });
};