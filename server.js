var express = require('express');
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var http = require('http').Server(app);
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemoryStore = require('connect-mongo')(session);
var app = express();
var multer = require('multer');
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

    //PostHandler = require('./handlers/post');
    postRouter = require('./routers/post');
    //postHandler = new PostHandler();
    UserHandler = require('./handlers/user');
    userRouter = require('./routers/user');
    userHandler = new UserHandler();

    app.use(express.static(__dirname + '/public'));
    var upload = multer({dest: './uploads/', inMemory: false});
    app.use(cookieParser("myTestPython"));
    app.use(session({
        name: 'crm',
        key: "newWorldNewK",
        secret: '19asdf90zxcv20trewq202519asdf90zxcv20trewq',
        resave: false,
        saveUninitialized: false,
        store: new MemoryStore(sessionConfig)
    }));

    app.use(bodyParser.json({limit: '1mb'}));

    /*app.get('/', function (req, res, next) {
     res.sendFile(path.join(__dirname, 'index.html'));
     });*/

    app.post('/login', userHandler.login);

    app.use('/api/posts', authStackMidlware, postRouter);
    app.use('/api/users', /*authStackMidlware, */userRouter);

    app.get('/photo', function (req, res) {
        var options = {
            root: __dirname + '/public',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
        res.set({
            //'Content-Type': 'image/jpeg',
            //'Content-Length': '123',
            //'ETag': '12345'
        });
        res.sendFile('/uploads/1.txt', options);
    });

    app.post('/photo', function (req, res) {
        var Photo = mongoose.model('photo');
        var photo = new Photo(req.body);
        photo.save(function (err, photo) {
            if (err) {
                return next(err);
            }

            //delete user.pass;
            res.status(201).send(photo);
        })
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

    app.listen(port, function () {
        console.log('server started at port', port);
    });
};