var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var port = 8080;
var ejs = require('ejs');
var morgan = require('morgan');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mongooseex');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    userLogin: String,
    userPassword: String,
    avatar: String,
    name: String,
    birth: String,
    email: String,
    location: String
});

var User = mongoose.model('User', UserSchema);

/*var user = new User({
 userLogin: 'igor',
 userPassword: '99',
 avatar: '',
 name: 'Igor',
 birth: 'Month 10',
 email: 'igor@somesite.com',
 location: 'Somecity'
 });

 user.save();

 var user = new User({
 userLogin: 'oleg',
 userPassword: '11',
 avatar: '',
 name: 'Oleg',
 birth: 'Month 20',
 email: 'oleg@somesite.com',
 location: 'Somecity'
 });

 user.save();*/

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: "anystringoftext",
    saveUninitialized: true,
    resave: true
}));


/*app.use('/', function (req, res) {
 res.send('Our first express program');
 console.log('cookie');
 console.log(req.cookies);
 console.log('================');
 console.log('session');
 });*/

//app.use(express.favicon());

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/', function (req, res) {
    User.findOne({userLogin: req.body.login, userPassword: req.body.password}, function (err, doc) {
        if (doc) {
            res.redirect('/' + doc.userLogin);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/:login', function (req, res) {
    User.findOne({userLogin: req.params.login}, function (err, doc) {
        console.log('err ' + err);
        console.log('name ' + doc.name);
        res.render('user', {userObject: doc});
    });
});

app.listen(port, function () {
    console.log('App listening on port ' + port);
});


